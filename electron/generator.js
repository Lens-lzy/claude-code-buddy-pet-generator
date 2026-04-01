// Buddy generation algorithm (ported from Claude Code source)
const SALT = 'friend-2026-401'
const SPECIES = ['duck','goose','blob','cat','dragon','octopus','owl',
    'penguin','turtle','snail','ghost','axolotl','capybara','cactus',
    'robot','rabbit','mushroom','chonk']
const RARITIES = ['common','uncommon','rare','epic','legendary']
const RARITY_WEIGHTS = { common:60, uncommon:25, rare:10, epic:4, legendary:1 }
const RARITY_RANK = { common:0, uncommon:1, rare:2, epic:3, legendary:4 }
const EYES = ['·', '✦', '×', '◉', '@', '°']
const HATS = ['none', 'crown', 'tophat', 'propeller', 'halo', 'wizard', 'beanie', 'tinyduck']

function mulberry32(seed) {
    let a = seed >>> 0
    return function() {
        a |= 0; a = (a + 0x6d2b79f5) | 0
        let t = Math.imul(a ^ (a >>> 15), 1 | a)
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296
    }
}

function hashString(s) {
    const hash = crypto.createHash('sha256').update(s).digest()
    return hash.readUInt32LE(0)
}

function pick(rng, arr) {
    return arr[Math.floor(rng() * arr.length)]
}

function rollRarity(rng) {
    let roll = rng() * 100
    for (const r of RARITIES) {
        roll -= RARITY_WEIGHTS[r]
        if (roll < 0) return r
    }
    return 'common'
}

function rollStats(rng, rarity) {
    const minStat = { common: 5, uncommon: 15, rare: 25, epic: 35, legendary: 50 }[rarity]
    const stats = {}
    const statNames = ['DEBUGGING', 'PATIENCE', 'CHAOS', 'WISDOM', 'SNARK']

    const peakIdx = Math.floor(rng() * 5)
    const lowIdx = (peakIdx + 1 + Math.floor(rng() * 4)) % 5

    statNames.forEach((name, i) => {
        if (i === peakIdx) {
            stats[name] = minStat + 50 + Math.floor(rng() * 30)
        } else if (i === lowIdx) {
            stats[name] = Math.max(1, minStat - 10 + Math.floor(rng() * 15))
        } else {
            stats[name] = minStat + Math.floor(rng() * 40)
        }
    })

    return stats
}

function generateFromUserId(userId) {
    const rng = mulberry32(hashString(userId + SALT))
    const species = pick(rng, SPECIES)
    const eye = pick(rng, EYES)
    const rarity = rollRarity(rng)
    const hat = rarity === 'common' ? 'none' : pick(rng, HATS.filter(h => h !== 'none'))
    const shiny = rng() < 0.01
    const stats = rollStats(rng, rarity)

    return { species, eye, rarity, hat, shiny, stats }
}

async function generateBuddy(filters) {
    const { species, rarity, hat, shiny, minStats, maxIterations } = filters
    const max = maxIterations || 500000

    let best = { rarity: 'common', uid: '', buddy: null }
    let found = 0

    for (let i = 0; i < max; i++) {
        const uid = crypto.randomBytes(32).toString('hex')
        const buddy = generateFromUserId(uid)

        // Check filters
        if (species && buddy.species !== species) continue
        if (hat && buddy.hat !== hat) continue
        if (shiny !== undefined && buddy.shiny !== shiny) continue

        // Check stats
        if (minStats) {
            let statsMatch = true
            for (const [stat, minVal] of Object.entries(minStats)) {
                if (buddy.stats[stat] < minVal) {
                    statsMatch = false
                    break
                }
            }
            if (!statsMatch) continue
        }

        // Check rarity
        if (rarity) {
            if (buddy.rarity === rarity) {
                return { success: true, uid, buddy, iterations: i + 1 }
            }
        } else {
            // No specific rarity, find best
            if (RARITY_RANK[buddy.rarity] > RARITY_RANK[best.rarity]) {
                best = { rarity: buddy.rarity, uid, buddy }
                found++

                if (buddy.rarity === 'legendary') {
                    return { success: true, uid, buddy, iterations: i + 1 }
                }
            }
        }

        // Progress callback every 10k iterations
        if (i % 10000 === 0 && mainWindow) {
            mainWindow.webContents.send('generation-progress', {
                current: i,
                max,
                found,
                best: best.buddy
            })
        }
    }

    if (best.buddy) {
        return { success: true, uid: best.uid, buddy: best.buddy, iterations: max }
    }

    return { success: false, error: 'No matching buddy found' }
}

module.exports = { generateBuddy, generateFromUserId }
