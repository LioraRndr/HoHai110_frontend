#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import re

# Read the file
with open('src/components/TimelineNode.vue', 'r', encoding='utf-8') as f:
    content = f.read()

# Define replacements
replacements = [
    ('关键人物', "$t('timeline.sections.keyFigures')"),
    ('关键时刻', "$t('timeline.sections.keyMoment')"),
    ('盛大时刻', "$t('timeline.sections.grandMoment')"),
    ('那些年的故事', "$t('timeline.sections.stories')"),
    ('难忘瞬间', "$t('timeline.sections.moments')"),
    ('转型', "$t('timeline.sections.transformation')"),
    ('重要意义', "$t('timeline.sections.significance')"),
    ('领导力量', "$t('timeline.sections.leadership')"),
    ('战略远见', "$t('timeline.sections.strategy')"),
    ('数据见证', "$t('timeline.sections.statisticsNew')"),
    ('那一年的数据', "$t('timeline.sections.statisticsOld')"),
    ('历史回声', "$t('timeline.sections.echo')"),
    ('突破性成果', "$t('timeline.sections.breakthroughs')"),
    ('传承', "$t('timeline.sections.legacy')"),
    ('庆典现场', "$t('timeline.sections.ceremony')"),
    ('那些在场的人', "$t('timeline.sections.attendees')"),
    ('象征意义', "$t('timeline.sections.symbolism')"),
    ('国际化成果', "$t('timeline.sections.international')"),
    ('现场连线', "$t('timeline.sections.connections')"),
    ('负责人:', "$t('timeline.labels.leader') + ':'"),
    ('研发单位:', "$t('timeline.labels.lab') + ':'"),
]

# Apply replacements for section titles
for old, new in replacements:
    # For section titles between h4 tags
    pattern = f'<h4 class="section-title">\\s*<span class="title-icon">[^<]*</span>\\s*{re.escape(old)}'
    replacement = f'<h4 class="section-title">\\n          <span class="title-icon">{{{{match_icon}}}}</span>\\n          {{{{ {new} }}}}'

    # Find all matches
    matches = list(re.finditer(pattern, content))
    for match in reversed(matches):
        icon_match = re.search(r'<span class="title-icon">([^<]*)</span>', match.group())
        if icon_match:
            icon = icon_match.group(1)
            repl = f'<h4 class="section-title">\\n          <span class="title-icon">{icon}</span>\\n          {{{{ {new} }}}}'
            content = content[:match.start()] + repl + content[match.end():]

# Handle the conditional statistics section
content = re.sub(
    r'(\{\{ node\.year >= 2000 \? )\'数据见证\' : \'那一年的数据\'( \}\})',
    r"\\1\\$t('timeline.sections.statisticsNew') : \\$t('timeline.sections.statisticsOld')\\2",
    content
)

# Handle leader and lab labels in breakthrough items
content = re.sub(r'<p v-if="item\.leader">负责人: \{\{ item\.leader \}\}</p>',
                '<p v-if="item.leader">{{ $t(\'timeline.labels.leader\') }}: {{ item.leader }}</p>',
                content)
content = re.sub(r'<p v-if="item\.lab">研发单位: \{\{ item\.lab \}\}</p>',
                '<p v-if="item.lab">{{ $t(\'timeline.labels.lab\') }}: {{ item.lab }}</p>',
                content)

# Write back
with open('src/components/TimelineNode.vue', 'w', encoding='utf-8') as f:
    f.write(content)

print("Replacement complete!")
