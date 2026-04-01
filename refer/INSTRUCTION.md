# 如何重置
## 1. 编辑 ~/.claude.json，删掉两个字段：

```
// 删掉这两段
"userID": "ab54093b...",
"companion": {
"name": "Pricklebait",
"personality": "...",
"hatchedAt": 1775006380441
}
```

## 2. 重启 Claude Code，会自动生成新 userID，再 /buddy 就能领到新宠物。

# 如何定向刷到指定物种？（重点来了）
## 用 Bun 跑
```
#!/usr/bin/env bun
// buddy-reroll-bun.js

const crypto = require('crypto')
const SALT = 'friend-2026-401'
const SPECIES = ['duck','goose','blob','cat','dragon','octopus','owl',
    'penguin','turtle','snail','ghost','axolotl','capybara','cactus',
    'robot','rabbit','mushroom','chonk']
const RARITIES = ['common','uncommon','rare','epic','legendary']
const RARITY_WEIGHTS = { common:60, uncommon:25, rare:10, epic:4, legendary:1 }
const RARITY_RANK = { common:0, uncommon:1, rare:2, epic:3, legendary:4 }

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
    return Number(BigInt(Bun.hash(s)) & 0xffffffffn)
}

function pick(rng, arr) { return arr[Math.floor(rng() * arr.length)] }

function rollRarity(rng) {
    let roll = rng() * 100
    for (const r of RARITIES) { roll -= RARITY_WEIGHTS[r]; if (roll < 0) return r }
    return 'common'
}

const TARGET = process.argv[2] || 'duck'
const MAX = parseInt(process.argv[3]) || 500000

let best = { rarity: 'common', uid: '' }
for (let i = 0; i < MAX; i++) {
    const uid = crypto.randomBytes(32).toString('hex')
    const rng = mulberry32(hashString(uid + SALT))
    const rarity = rollRarity(rng)
    const species = pick(rng, SPECIES)
    if (species === TARGET && RARITY_RANK[rarity] > RARITY_RANK[best.rarity]) {
        best = { rarity, uid }
        console.log(`found: ${rarity} ${species} -> ${uid}`)
        if (rarity === 'legendary') break
    }
}
console.log(`\nBest: ${best.rarity} ${TARGET} -> ${best.uid}`)
```

运行：
```
bun buddy-reroll-bun.js duck 500000
```

输出：
```
found: uncommon duck -> 160bd890...
found: rare duck -> a1cc774a...
found: epic duck -> 883062be...
found: legendary duck -> 3e75bebd7bfcdf36b2234650415ce51a64d37bcdb8f7db0c5f979cbfe5f3bc66
```

50 万次迭代基本稳定能出 legendary，几秒就跑完。

## 写入配置
把刷到的 userID 写进 ~/.claude.json（确保 companion 字段已删除），重启后 /buddy 领取即可。

以上分析基于 Claude Code 2.1.89 Native
其它版本如果改了 SALT 或算法，脚本需要对应调整，交给 Claude修改即可。