import re, sys, json

# names to cut
CUT = set(json.loads(sys.argv[1]))

PRESET_FILES = [
    'src/data/presetCards.ts',
    'src/data/presetCardsExpansionA.ts',
    'src/data/presetCardsExpansionB.ts',
    'src/data/presetCardsExpansionC.ts',
    'src/data/collections.ts',  # ICON_CARDS objects live here too
]
MAP_FILES = ['src/data/cardRegistry.ts', 'src/lib/avatar.ts']

removed = {}

def strip_preset_objects(path):
    src = open(path).read()
    out = []
    i = 0
    n = len(src)
    while i < n:
        # find start of an object at array-item indentation
        if src[i] == '{':
            # brace-match
            depth = 0
            j = i
            instr = None
            while j < n:
                ch = src[j]
                if instr:
                    if ch == instr and src[j-1] != '\\':
                        instr = None
                elif ch in "'\"`":
                    instr = ch
                elif ch == '{':
                    depth += 1
                elif ch == '}':
                    depth -= 1
                    if depth == 0:
                        break
                j += 1
            block = src[i:j+1]
            m = re.search(r"name:\s*'([^']+)'", block)
            if m and m.group(1) in CUT:
                removed.setdefault(path, []).append(m.group(1))
                # also consume trailing comma + surrounding whitespace/newline
                k = j+1
                while k < n and src[k] in ' \t':
                    k += 1
                if k < n and src[k] == ',':
                    k += 1
                # consume one trailing newline
                if k < n and src[k] == '\n':
                    k += 1
                # trim a leading blank line we might leave: drop preceding spaces on current line
                # (out already has text up to i)
                i = k
                continue
            else:
                out.append(src[i:j+1])
                i = j+1
                continue
        else:
            out.append(src[i])
            i += 1
    open(path, 'w').write(''.join(out))

def strip_map_lines(path):
    lines = open(path).read().split('\n')
    keep = []
    for ln in lines:
        m = re.match(r"\s*'([^']+)':\s", ln)
        if m and m.group(1) in CUT:
            removed.setdefault(path, []).append(m.group(1))
            continue
        keep.append(ln)
    open(path, 'w').write('\n'.join(keep))

def strip_duos(path='src/data/chemistry.ts'):
    lines = open(path).read().split('\n')
    keep = []
    for ln in lines:
        if 'pair:' in ln and any(f"'{c}'" in ln for c in CUT):
            removed.setdefault(path, []).append(ln.strip()[:60])
            continue
        keep.append(ln)
    open(path, 'w').write('\n'.join(keep))

for f in PRESET_FILES:
    strip_preset_objects(f)
for f in MAP_FILES:
    strip_map_lines(f)
strip_duos()

print(json.dumps(removed, indent=1))
