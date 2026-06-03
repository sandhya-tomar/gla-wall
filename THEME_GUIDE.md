# 🎨 How to Change Colors — GLA Anything

Open this one file:
**`frontend/src/index.css`**

At the very top you'll see `:root { ... }` — that's where ALL colors live.

---

## Quick changes:

### Change the main purple:
```css
--brand:  #5429B8;   ← change this hex code
--brand2: #8B5CF6;   ← lighter shade of same color
--brand3: #C4B5FD;   ← even lighter (used for text on dark bg)
```

### Change the gold:
```css
--gold:  #F0C040;    ← main gold
--gold2: #D4A017;    ← darker gold
```

### Change background (dark/light):
```css
--bg:       #0C0918;  ← page background (darkest)
--surface1: #160D2E;  ← topbar, sidebar bg
--surface2: #1E1240;  ← cards
--surface3: #241650;  ← inputs, nested bg
```

### Want a LIGHT theme instead?
Change all backgrounds to light colors:
```css
--bg:       #F8F7FF;
--surface1: #FFFFFF;
--surface2: #F3F0FF;
--surface3: #EDE9FE;
--text:     #1A0A3D;
--muted:    #6B5FA0;
--border:   rgba(84,41,184,0.15);
```

---

## Color combo ideas:

| Vibe         | --brand   | --gold    |
|--------------|-----------|-----------|
| Blue + Teal  | #1D4ED8   | #0D9488   |
| Pink + Orange| #BE185D   | #EA580C   |
| Green + Gold | #065F46   | #D97706   |
| Red + Cream  | #991B1B   | #F59E0B   |
| Current (Purple + Gold) | #5429B8 | #F0C040 |

---

## Fonts:
Change in `frontend/index.html` and `frontend/src/index.css`:
```
'Space Grotesk'  ← current (techy feel)
'DM Sans'        ← clean and modern
'Nunito'         ← soft and friendly
'Poppins'        ← popular, rounded
```
