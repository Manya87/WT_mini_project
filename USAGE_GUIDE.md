# Algorithm Visualizer - Step-by-Step Usage Guide

## Starting the Application

1. Open terminal in the project folder
2. Run: `npm run dev`
3. Open browser and go to: `http://localhost:5173`
4. You'll see the visualizer with controls on the left and visualization on the right

---

## Step 1: Setting Array Size

**What it does:** Controls how many numbers will be visualized

**How to use:**
1. Look at the **"Array Size"** slider on the left sidebar
2. Drag the slider left (fewer numbers) or right (more numbers)
3. Range: 5 to 200 elements
4. Example: Set to 50 to visualize 50 random numbers

**Why:** Smaller arrays = faster visualization, easier to see details. Larger arrays = see algorithm behavior on big datasets.

---

## Step 2: Enter Custom Array (Optional)

**What it does:** Instead of random numbers, use your own array

**How to use:**
1. Click on **"Custom Array Input"** box
2. Type comma-separated numbers: `5,8,2,9,1,4`
3. Numbers must be between 1-1000
4. Maximum 200 numbers
5. Click **"Submit"** button (or press Enter)
6. Click **"Example"** button to see a pre-filled example

**Result:** The visualization will now use YOUR numbers instead of random ones

---

## Step 3: Set Animation Speed

**What it does:** Controls how fast the visualization animates

**How to use:**
1. Look at the **"Speed"** slider below Array Size
2. Drag left for slower animation (easier to follow)
3. Drag right for faster animation
4. Range: 1 (very slow) to 10 (very fast)

**Example speeds:**
- Speed 1-2: See each comparison/swap clearly
- Speed 5: Normal viewing speed
- Speed 10: Quick overview of the algorithm

---

## Step 4: Choose Algorithm Type

**What it does:** Select which algorithm to visualize

**How to use:**
1. Look at **"Algorithm Selection"** section in middle left
2. Click on a category:
   - **Sorting Algorithms** (6 options)
   - **Searching Algorithms** (2 options)

---

## Step 5: Pick Specific Algorithm (for Sorting)

**Sorting Algorithms:**
1. **Bubble Sort** - Compares adjacent pairs, slower but simple
2. **Selection Sort** - Finds minimum repeatedly
3. **Insertion Sort** - Builds sorted array step by step
4. **Merge Sort** - Divide-and-conquer approach, fast
5. **Quick Sort** - Partition-based, usually fastest
6. **Heap Sort** - Uses heap data structure, consistent speed

**How to select:**
1. Click the algorithm name
2. Animation starts automatically

---

## Step 6: NEW - Choose Sort Order (for Sorting Only)

**What it does:** Sort ascending (lowest to highest) or descending (highest to lowest)

**How to use:**
1. When you select a sorting algorithm, **"Sort Order"** buttons appear
2. Click **⬆️ Ascending** for low to high (default)
3. Click **⬇️ Descending** for high to low
4. Animation resets and runs with new order

**Example:**
- Ascending: 1, 2, 3, 4, 5
- Descending: 5, 4, 3, 2, 1

---

## Step 7: Pick Specific Algorithm (for Searching)

**Searching Algorithms:**
1. **Linear Search** - Checks each element one by one
2. **Binary Search** - Cuts search space in half each time (faster but requires sorted array)

**How to select:**
1. Click the algorithm name
2. Animation shows where it found (or didn't find) the target

---

## Step 8: NEW - Enter Search Target (for Searching Only)

**What it does:** Specify which number to search for

**How to use:**
1. When you select a searching algorithm, **"Search Target"** input appears
2. Type a number between 1-1000
3. The algorithm will search for that exact number
4. Animation shows the search process
5. Found element gets highlighted in green ✓

**Example:**
- Array: 5, 2, 8, 1, 9
- Target: 8
- Linear Search will check: 5 ✗, 2 ✗, 8 ✓ (found!)

---

## Understanding the Visualization

**Color Key:**
- **Gray bars** = Not yet compared/visited
- **Yellow/Orange bars** = Currently being compared
- **Green bars** = Element in correct position (for sorting) OR target found (for searching)
- **Red bars** = Swaps happening

**Speed Indicators:**
- Numbers at top show: comparisons, swaps, array accesses
- Higher = more operations needed

---

## Complete Example Workflow

1. ✅ Set Array Size to 30
2. ✅ Leave animation speed at 5
3. ✅ Click "Bubble Sort" (Sorting category)
4. ✅ Click "⬆️ Ascending" button
5. ✅ Watch animation - bars rise from left to right
6. ✅ When done, see total operations in stats

---

## Complete Example Workflow (Searching)

1. ✅ Set Array Size to 20
2. ✅ Click "Linear Search" (Searching category)
3. ✅ Enter "42" in Search Target input
4. ✅ Click "Run" or let it auto-start
5. ✅ Watch algorithm check each element
6. ✅ If found: element highlighted green
7. ✅ If not found: shows it checked all elements

---

## Tips for Best Experience

### For Learning Sorting
- Start with **Bubble Sort** at speed 2-3 (easiest to follow)
- Progress to **Merge Sort** (see divide-and-conquer)
- Compare times: Quick Sort vs Heap Sort

### For Learning Searching
- Use **small arrays** (5-10) first
- Try **Linear Search** to see brute force
- Try **Binary Search** to see efficiency (must be sorted first!)

### For Performance Testing
- Set speed to 10 and array size to 200
- Watch which algorithm finishes first
- Compare operation counts in stats

---

## Keyboard Info

- No special keyboard shortcuts
- All controls are mouse-based buttons/sliders
- Type numbers directly in input fields

---

## Troubleshooting

**"Search Target" input missing?**
- ✓ You're viewing a sorting algorithm. Select "Linear Search" or "Binary Search" instead.

**"Sort Order" buttons missing?**
- ✓ You're viewing a searching algorithm. Select a sorting algorithm instead.

**Custom array didn't apply?**
- ✓ Make sure all numbers are 1-1000
- ✓ Max 200 numbers
- ✓ Check for typos (use commas, no spaces after commas is OK)

**Animation too fast/slow?**
- ✓ Adjust the Speed slider (1 = slowest, 10 = fastest)

---

## Next Steps

1. Try different algorithms on the **same array** - see which is fastest
2. Use **custom arrays** to test edge cases (all same, reverse sorted, etc.)
3. Change **sort order** and watch how it affects visualization
4. Compare **search algorithms** on large arrays
5. Read ARCHITECTURE.md for technical details

Enjoy exploring algorithms! 🎨📊
