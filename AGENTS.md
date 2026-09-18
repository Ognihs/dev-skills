## 约束
- SKILL.md 默认使用英文书写，不需遵循 markdown 的 80 列 hard-wrap 规范，如果是一句话，保持在同一行
- 总是参考下面的最佳实践书写skill，每次修改skill后，也参考最佳实践进行review
- 单个 markdown 文件，除非非常必要，否则不得超过 150 行。理想状态下应该小于 100 行
- 提交前，review并重新整理[README](README.md)，使其反应最新现状的同时仍保持极简，且不包含contributor、社区、营销背景或冗长理念说明等不重要的内容
- 除非用户显式提及，否则不要使用项目内的 skill
- 每次修改开发工作流相关的skill后都需要对工作流相关的skill做总体检查，确保这些skill之间不强相关的同时整个工作流是通顺的。工作流相关的skill包含：
  - `discover-initiative`: (可选)当大型initiative包含大量未知、依赖尚不明确或无法装入一次session时，用一份精简的`docs/discovery/`文档逐步消除阻塞未知，最后交给`clarify-requirements`形成需求文档
  - `手写需求草稿`: (可选，这不是一个skill，只是工作流的一部分)可以先手写需求，按需交给`clarify-requirements`完善，或直接进入技术设计
  - `clarify-requirements`: (可选)当用户希望先澄清、整理或完善需求时，从口述想法、产品说明、PRD或已有草稿形成需求文档；仅在需求依赖现状时按需核对代码并保留已确认决定。技术设计仍有实质未决项时交给`brainstorming`，已有完整已决设计时直接交给`to-spec`；不因开发请求模糊而自动增加此步骤
  - `技术设计与spec`: (必选)所有计划开发都必须先形成Approved spec，作为后续开发行为的唯一事实来源，也是唯一提交到repo的文档。设计仍有实质未决项时由`brainstorming`收敛设计并编排`to-spec`，已有完整已决设计时直接使用`to-spec`
  - `to-roadmap`: (可选)如果Approved spec设计很紧密，但是又庞大到无法在一个200K的session中完成，使用这个skill将spec切分成可以在一个200K的session中完成的多个切片。其中每个切片都会各自交给`feature-dev`进行开发
  - `feature-dev`: (必选)将spec或者某个slice交付开发，开发时会检查codebase、对不清楚或者和现状不符的地方提问、代码设计、开发(TDD)、review

## Skill 自洽性
- 每个skill必须是自洽的任务单元，独立定义自己的通用输入契约、工作流程、输出契约和完成条件
- 用输入内容和artifact形态描述入口，不依赖输入由哪个上游skill产生；下游skill也不需要知道输入的生成来源
- 除非另一个skill是完成当前流程所必需的强依赖，或者当前skill已经完成并在末尾handoff，否则不要在description、正文规则或分支中提及其他skill
- 跨skill的选择和整体路由应集中在本文件等工作流总览或专门的router中，不要分散到相邻skills里形成sibling-awareness
- Handoff保持单向，只传递自包含artifact和必要上下文，避免循环依赖、反向依赖和依赖对话历史

## 工具无关性
- Skill默认必须跨Agent宿主工作，不得绑定Codex、Claude Code或其他特定产品；只有用户明确要求的工具专用skill可以例外
- 用能力描述操作，例如读取文件、运行命令、查询外部资料或委派只读探索；运行时使用当前宿主提供的等价机制
- 不得依赖特定产品的命令、目录、配置、UI metadata或私有能力；不要添加`agents/openai.yaml`、`.claude/`等宿主专属文件
- 当某项能力并非所有宿主都提供时，说明所需能力和缺失时的降级行为，不要假定某个具体工具一定存在

## 最佳实践
- Skill 来自真实项目经验，而不是通用知识
- 描述一个完整、清晰、可复用的任务单元
- 只写 Agent 不知道或容易做错的内容
- SKILL.md 保持简短，详细材料按需加载
- 为工具和方案提供默认选择
- 高风险步骤使用严格、准确的指令
- 添加具体的 Gotchas
- 有固定输出要求时提供模板
- 多步骤任务提供 Checklist
- 结果生成后必须校验并修复
- 破坏性操作先 Plan，再 Validate，最后 Execute
- 重复且确定性的逻辑封装进 scripts/
