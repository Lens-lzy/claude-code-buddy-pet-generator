import React, { useState, useEffect } from 'react'

const SPECIES = [
  { id: 'duck', name: '🦆 鸭子' },
  { id: 'goose', name: '🪿 鹅' },
  { id: 'blob', name: '🫧 果冻' },
  { id: 'cat', name: '🐱 猫' },
  { id: 'dragon', name: '🐉 龙' },
  { id: 'octopus', name: '🐙 章鱼' },
  { id: 'owl', name: '🦉 猫头鹰' },
  { id: 'penguin', name: '🐧 企鹅' },
  { id: 'turtle', name: '🐢 乌龟' },
  { id: 'snail', name: '🐌 蜗牛' },
  { id: 'ghost', name: '👻 幽灵' },
  { id: 'axolotl', name: '🦎 六角恐龙' },
  { id: 'capybara', name: '🦫 水豚' },
  { id: 'cactus', name: '🌵 仙人掌' },
  { id: 'robot', name: '🤖 机器人' },
  { id: 'rabbit', name: '🐰 兔子' },
  { id: 'mushroom', name: '🍄 蘑菇' },
  { id: 'chonk', name: '🐈 胖猫' }
]

const RARITIES = [
  { id: 'common', name: '★ 普通', color: '#9ca3af' },
  { id: 'uncommon', name: '★★ 非凡', color: '#22c55e' },
  { id: 'rare', name: '★★★ 稀有', color: '#3b82f6' },
  { id: 'epic', name: '★★★★ 史诗', color: '#a855f7' },
  { id: 'legendary', name: '★★★★★ 传说', color: '#eab308' }
]

const HATS = [
  { id: 'none', name: '无帽子' },
  { id: 'crown', name: '👑 皇冠' },
  { id: 'tophat', name: '🎩 礼帽' },
  { id: 'propeller', name: '🚁 螺旋桨帽' },
  { id: 'halo', name: '😇 光环' },
  { id: 'wizard', name: '🧙 巫师帽' },
  { id: 'beanie', name: '🧢 毛线帽' },
  { id: 'tinyduck', name: '🦆 小鸭子' }
]

const STATS = [
  { id: 'DEBUGGING', name: '调试能力' },
  { id: 'PATIENCE', name: '耐心' },
  { id: 'CHAOS', name: '混乱值' },
  { id: 'WISDOM', name: '智慧' },
  { id: 'SNARK', name: '毒舌值' }
]

function App() {
  const [filters, setFilters] = useState({
    species: null,
    rarity: null,
    hat: null,
    shiny: false,
    minStats: {},
    maxIterations: 500000
  })

  const [generating, setGenerating] = useState(false)
  const [progress, setProgress] = useState(null)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (window.electron) {
      window.electron.onGenerationProgress((data) => {
        setProgress(data)
      })
    }
  }, [])

  const handleGenerate = async () => {
    setGenerating(true)
    setProgress(null)
    setResult(null)
    setError(null)

    try {
      const res = await window.electron.generateBuddy(filters)
      if (res.success) {
        setResult(res)
      } else {
        setError(res.error)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setGenerating(false)
    }
  }

  const handleWriteConfig = async () => {
    if (!result) return

    try {
      const configRes = await window.electron.readConfig()
      let config = configRes.success ? configRes.data : {}

      // Remove companion field and set new userID
      delete config.companion
      config.userID = result.uid

      const writeRes = await window.electron.writeConfig(config)
      if (writeRes.success) {
        alert('✅ 配置已写入 ~/.claude.json\n请重启 Claude Code 并运行 /buddy hatch')
      } else {
        alert('❌ 写入失败: ' + writeRes.error)
      }
    } catch (err) {
      alert('❌ 写入失败: ' + err.message)
    }
  }

  const toggleFilter = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key] === value ? null : value
    }))
  }

  const updateStat = (stat, value) => {
    setFilters(prev => ({
      ...prev,
      minStats: {
        ...prev.minStats,
        [stat]: value ? parseInt(value) : undefined
      }
    }))
  }

  return (
    <div className="app">
      <div className="header">
        <h1>🎮 Buddy Pet Generator</h1>
        <p>为 Claude Code 生成你想要的电子宠物</p>
      </div>

      <div className="content">
        <div className="section">
          <div className="section-title">选择物种</div>
          <div className="filter-grid">
            {SPECIES.map(s => (
              <div
                key={s.id}
                className={`filter-item ${filters.species === s.id ? 'selected' : ''}`}
                onClick={() => toggleFilter('species', s.id)}
              >
                {s.name}
              </div>
            ))}
          </div>
        </div>

        <div className="section">
          <div className="section-title">选择稀有度</div>
          <div className="filter-grid">
            {RARITIES.map(r => (
              <div
                key={r.id}
                className={`filter-item ${filters.rarity === r.id ? 'selected' : ''}`}
                onClick={() => toggleFilter('rarity', r.id)}
                style={filters.rarity === r.id ? { borderColor: r.color, background: r.color } : {}}
              >
                {r.name}
              </div>
            ))}
          </div>
        </div>

        <div className="section">
          <div className="section-title">选择帽子</div>
          <div className="filter-grid">
            {HATS.map(h => (
              <div
                key={h.id}
                className={`filter-item ${filters.hat === h.id ? 'selected' : ''}`}
                onClick={() => toggleFilter('hat', h.id)}
              >
                {h.name}
              </div>
            ))}
          </div>
        </div>

        <div className="section">
          <div className="section-title">
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={filters.shiny}
                onChange={(e) => setFilters(prev => ({ ...prev, shiny: e.target.checked }))}
              />
              闪光 (1% 概率)
            </label>
          </div>
        </div>

        <div className="section">
          <div className="section-title">属性要求 (最小值)</div>
          <div className="stats-grid">
            {STATS.map(s => (
              <div key={s.id} className="stat-input">
                <label>{s.name}</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  placeholder="不限"
                  value={filters.minStats[s.id] || ''}
                  onChange={(e) => updateStat(s.id, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>

        {progress && (
          <div className="progress">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${(progress.current / filters.maxIterations) * 100}%` }}
              />
            </div>
            <div className="progress-text">
              已搜索: {progress.current.toLocaleString()} / {filters.maxIterations.toLocaleString()}
              {progress.found > 0 && ` | 已找到 ${progress.found} 个候选`}
            </div>
          </div>
        )}

        {result && (
          <div className="result">
            <div className="result-title">🎉 找到匹配的宠物!</div>
            <div className="result-content">
              <p><strong>物种:</strong> {SPECIES.find(s => s.id === result.buddy.species)?.name}</p>
              <p><strong>稀有度:</strong> {RARITIES.find(r => r.id === result.buddy.rarity)?.name}</p>
              <p><strong>帽子:</strong> {HATS.find(h => h.id === result.buddy.hat)?.name}</p>
              <p><strong>闪光:</strong> {result.buddy.shiny ? '✨ 是' : '否'}</p>
              <p><strong>属性:</strong></p>
              <ul style={{ marginLeft: '20px', marginTop: '4px' }}>
                {Object.entries(result.buddy.stats).map(([stat, val]) => (
                  <li key={stat}>{STATS.find(s => s.id === stat)?.name}: {val}</li>
                ))}
              </ul>
              <p style={{ marginTop: '8px' }}><strong>User ID:</strong> <code>{result.uid}</code></p>
              <p><strong>迭代次数:</strong> {result.iterations.toLocaleString()}</p>
            </div>
          </div>
        )}

        {error && (
          <div className="result error">
            <div className="result-title">❌ 生成失败</div>
            <div className="result-content">{error}</div>
          </div>
        )}
      </div>

      <div className="actions">
        <button
          className="btn btn-primary"
          onClick={handleGenerate}
          disabled={generating}
        >
          {generating ? '生成中...' : '🎲 开始生成'}
        </button>
        <button
          className="btn btn-secondary"
          onClick={handleWriteConfig}
          disabled={!result}
        >
          💾 写入配置
        </button>
      </div>
    </div>
  )
}

export default App
