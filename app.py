"""
Algorithm Visualizer - Streamlit Edition
A visual learning tool for sorting and searching algorithms
"""

import streamlit as st
import numpy as np
import plotly.graph_objects as go
from typing import List, Tuple
import time

# ============================================================================
# ALGORITHM IMPLEMENTATIONS
# ============================================================================

def bubble_sort(arr: List[int], target: int = None, descending: bool = False) -> Tuple[List[dict], int, int, int]:
    """Bubble Sort with frame tracking"""
    arr = arr.copy()
    n = len(arr)
    frames = []
    comparisons = swaps = accesses = 0
    
    for i in range(n):
        for j in range(0, n - i - 1):
            comparisons += 1
            accesses += 2
            
            if (arr[j] > arr[j + 1] and not descending) or (arr[j] < arr[j + 1] and descending):
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swaps += 1
            
            frames.append({
                'array': arr.copy(),
                'comparing': [j, j + 1],
                'sorted': list(range(n - i, n))
            })
    
    frames.append({'array': arr.copy(), 'comparing': [], 'sorted': list(range(n))})
    return frames, comparisons, swaps, accesses

def selection_sort(arr: List[int], target: int = None, descending: bool = False) -> Tuple[List[dict], int, int, int]:
    """Selection Sort with frame tracking"""
    arr = arr.copy()
    n = len(arr)
    frames = []
    comparisons = swaps = accesses = 0
    
    for i in range(n):
        min_idx = i
        accesses += 1
        
        for j in range(i + 1, n):
            comparisons += 1
            accesses += 1
            
            if (arr[j] < arr[min_idx] and not descending) or (arr[j] > arr[min_idx] and descending):
                min_idx = j
        
        if min_idx != i:
            arr[i], arr[min_idx] = arr[min_idx], arr[i]
            swaps += 1
        
        frames.append({
            'array': arr.copy(),
            'comparing': [i],
            'sorted': list(range(i + 1))
        })
    
    frames.append({'array': arr.copy(), 'comparing': [], 'sorted': list(range(n))})
    return frames, comparisons, swaps, accesses

def insertion_sort(arr: List[int], target: int = None, descending: bool = False) -> Tuple[List[dict], int, int, int]:
    """Insertion Sort with frame tracking"""
    arr = arr.copy()
    n = len(arr)
    frames = []
    comparisons = swaps = accesses = 0
    
    for i in range(1, n):
        key = arr[i]
        accesses += 1
        j = i - 1
        
        while j >= 0 and ((arr[j] > key and not descending) or (arr[j] < key and descending)):
            comparisons += 1
            accesses += 1
            arr[j + 1] = arr[j]
            swaps += 1
            j -= 1
        
        arr[j + 1] = key
        frames.append({
            'array': arr.copy(),
            'comparing': [j + 1],
            'sorted': list(range(i + 1))
        })
    
    frames.append({'array': arr.copy(), 'comparing': [], 'sorted': list(range(n))})
    return frames, comparisons, swaps, accesses

def merge_sort(arr: List[int], target: int = None, descending: bool = False) -> Tuple[List[dict], int, int, int]:
    """Merge Sort with frame tracking"""
    frames = []
    comparisons = [0]
    swaps = [0]
    accesses = [0]
    
    def merge(arr, left, mid, right):
        left_arr = arr[left:mid + 1]
        right_arr = arr[mid + 1:right + 1]
        i = j = 0
        k = left
        
        while i < len(left_arr) and j < len(right_arr):
            comparisons[0] += 1
            accesses[0] += 2
            
            if (left_arr[i] <= right_arr[j] and not descending) or (left_arr[i] > right_arr[j] and descending):
                arr[k] = left_arr[i]
                i += 1
            else:
                arr[k] = right_arr[j]
                j += 1
            
            swaps[0] += 1
            k += 1
        
        while i < len(left_arr):
            arr[k] = left_arr[i]
            accesses[0] += 1
            i += 1
            k += 1
        
        while j < len(right_arr):
            arr[k] = right_arr[j]
            accesses[0] += 1
            j += 1
            k += 1
        
        frames.append({'array': arr.copy(), 'comparing': [], 'sorted': []})
    
    def merge_sort_helper(arr, left, right):
        if left < right:
            mid = (left + right) // 2
            merge_sort_helper(arr, left, mid)
            merge_sort_helper(arr, mid + 1, right)
            merge(arr, left, mid, right)
    
    arr = arr.copy()
    merge_sort_helper(arr, 0, len(arr) - 1)
    frames.append({'array': arr.copy(), 'comparing': [], 'sorted': list(range(len(arr)))})
    return frames, comparisons[0], swaps[0], accesses[0]

def quick_sort(arr: List[int], target: int = None, descending: bool = False) -> Tuple[List[dict], int, int, int]:
    """Quick Sort with frame tracking"""
    frames = []
    comparisons = [0]
    swaps = [0]
    accesses = [0]
    
    def partition(arr, low, high):
        pivot = arr[high]
        accesses[0] += 1
        i = low - 1
        
        for j in range(low, high):
            comparisons[0] += 1
            accesses[0] += 1
            
            if (arr[j] < pivot and not descending) or (arr[j] > pivot and descending):
                i += 1
                arr[i], arr[j] = arr[j], arr[i]
                swaps[0] += 1
        
        arr[i + 1], arr[high] = arr[high], arr[i + 1]
        swaps[0] += 1
        frames.append({'array': arr.copy(), 'comparing': [], 'sorted': []})
        return i + 1
    
    def quick_sort_helper(arr, low, high):
        if low < high:
            pi = partition(arr, low, high)
            quick_sort_helper(arr, low, pi - 1)
            quick_sort_helper(arr, pi + 1, high)
    
    arr = arr.copy()
    quick_sort_helper(arr, 0, len(arr) - 1)
    frames.append({'array': arr.copy(), 'comparing': [], 'sorted': list(range(len(arr)))})
    return frames, comparisons[0], swaps[0], accesses[0]

def heap_sort(arr: List[int], target: int = None, descending: bool = False) -> Tuple[List[dict], int, int, int]:
    """Heap Sort with frame tracking"""
    frames = []
    comparisons = [0]
    swaps = [0]
    accesses = [0]
    
    def heapify(arr, n, i):
        largest = i
        left = 2 * i + 1
        right = 2 * i + 2
        
        if left < n:
            comparisons[0] += 1
            accesses[0] += 1
            if (arr[left] > arr[largest] and not descending) or (arr[left] < arr[largest] and descending):
                largest = left
        
        if right < n:
            comparisons[0] += 1
            accesses[0] += 1
            if (arr[right] > arr[largest] and not descending) or (arr[right] < arr[largest] and descending):
                largest = right
        
        if largest != i:
            arr[i], arr[largest] = arr[largest], arr[i]
            swaps[0] += 1
            heapify(arr, n, largest)
    
    arr = arr.copy()
    n = len(arr)
    
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    
    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]
        swaps[0] += 1
        heapify(arr, i, 0)
        frames.append({'array': arr.copy(), 'comparing': [], 'sorted': list(range(n - i, n))})
    
    frames.append({'array': arr.copy(), 'comparing': [], 'sorted': list(range(n))})
    return frames, comparisons[0], swaps[0], accesses[0]

def linear_search(arr: List[int], target: int = 50, descending: bool = False) -> Tuple[List[dict], int, int, int]:
    """Linear Search with frame tracking"""
    arr = arr.copy()
    frames = []
    comparisons = accesses = 0
    found = False
    found_idx = -1
    
    for i in range(len(arr)):
        comparisons += 1
        accesses += 1
        frames.append({
            'array': arr.copy(),
            'comparing': [i],
            'found': i if arr[i] == target else -1
        })
        
        if arr[i] == target:
            found = True
            found_idx = i
            break
    
    frames.append({'array': arr.copy(), 'comparing': [], 'found': found_idx})
    return frames, comparisons, 0, accesses

def binary_search(arr: List[int], target: int = 50, descending: bool = False) -> Tuple[List[dict], int, int, int]:
    """Binary Search with frame tracking"""
    arr = sorted(arr, reverse=descending)
    frames = []
    comparisons = accesses = 0
    found_idx = -1
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        comparisons += 1
        accesses += 1
        
        frames.append({
            'array': arr.copy(),
            'comparing': [mid],
            'found': -1
        })
        
        if arr[mid] == target:
            found_idx = mid
            break
        elif (arr[mid] < target and not descending) or (arr[mid] > target and descending):
            left = mid + 1
        else:
            right = mid - 1
    
    frames.append({'array': arr.copy(), 'comparing': [], 'found': found_idx})
    return frames, comparisons, 0, accesses

# ============================================================================
# VISUALIZATION
# ============================================================================

def create_visualization(frames: List[dict], current_frame: int, title: str) -> go.Figure:
    """Create Plotly bar chart for current frame"""
    if not frames:
        return go.Figure()
    
    frame_data = frames[min(current_frame, len(frames) - 1)]
    arr = frame_data['array']
    
    colors = ['lightgray'] * len(arr)
    
    # Color sorted elements green
    if 'sorted' in frame_data:
        for idx in frame_data['sorted']:
            if idx < len(colors):
                colors[idx] = 'lightgreen'
    
    # Color comparing elements orange
    if 'comparing' in frame_data:
        for idx in frame_data['comparing']:
            if idx < len(colors):
                colors[idx] = 'orange'
    
    # Color found element green
    if 'found' in frame_data and frame_data['found'] >= 0:
        colors[frame_data['found']] = 'lightgreen'
    
    fig = go.Figure(data=[
        go.Bar(
            x=list(range(len(arr))),
            y=arr,
            marker=dict(color=colors),
            showlegend=False
        )
    ])
    
    fig.update_layout(
        title=f"{title} (Frame {current_frame + 1}/{len(frames)})",
        xaxis_title="Index",
        yaxis_title="Value",
        height=400,
        showlegend=False,
        hovermode='x unified'
    )
    
    return fig

# ============================================================================
# STREAMLIT APP
# ============================================================================

st.set_page_config(page_title="Algorithm Visualizer", layout="wide")

st.title("🎨 Algorithm Visualizer")
st.markdown("**Learn algorithms by watching them in action!**")

# Initialize session state
if 'frames' not in st.session_state:
    st.session_state.frames = []
if 'comparisons' not in st.session_state:
    st.session_state.comparisons = 0
if 'swaps' not in st.session_state:
    st.session_state.swaps = 0
if 'accesses' not in st.session_state:
    st.session_state.accesses = 0
if 'current_frame' not in st.session_state:
    st.session_state.current_frame = 0

# Sidebar Controls
st.sidebar.header("⚙️ Controls")

# Array Size
array_size = st.sidebar.slider("Array Size", 5, 200, 50)

# Speed (for playback control)
speed = st.sidebar.slider("Speed (1=slow, 10=fast)", 1, 10, 5)

# Custom Array Input
st.sidebar.subheader("Custom Array Input")
array_input = st.sidebar.text_input(
    "Enter comma-separated numbers (1-1000)",
    placeholder="e.g., 5,8,2,9,1,4"
)

if array_input:
    try:
        custom_array = [int(x.strip()) for x in array_input.split(',')]
        if all(1 <= x <= 1000 for x in custom_array):
            if len(custom_array) <= 200:
                arr = np.array(custom_array)
            else:
                st.sidebar.error("Maximum 200 numbers allowed")
                arr = np.random.randint(1, 1000, array_size)
        else:
            st.sidebar.error("Numbers must be between 1-1000")
            arr = np.random.randint(1, 1000, array_size)
    except ValueError:
        st.sidebar.error("Invalid input format")
        arr = np.random.randint(1, 1000, array_size)
else:
    arr = np.random.randint(1, 1000, array_size)

# Algorithm Selection
st.sidebar.subheader("Algorithm Selection")
category = st.sidebar.radio("Category", ["Sorting", "Searching"])

algorithms = {
    "Sorting": ["Bubble Sort", "Selection Sort", "Insertion Sort", "Merge Sort", "Quick Sort", "Heap Sort"],
    "Searching": ["Linear Search", "Binary Search"]
}

selected_algo = st.sidebar.selectbox("Choose Algorithm", algorithms[category])

# Sort Order (only for sorting)
sort_order = "ascending"
if category == "Sorting":
    sort_order = st.sidebar.radio("Sort Order", ["ascending", "descending"], key="sort_order")

# Search Target (only for searching)
search_target = 50
if category == "Searching":
    search_target = st.sidebar.number_input("Search Target", 1, 1000, 50)

# Run Button
if st.sidebar.button("🚀 Run Algorithm", key="run_button"):
    descending = sort_order == "descending"
    algo_map = {
        "Bubble Sort": bubble_sort,
        "Selection Sort": selection_sort,
        "Insertion Sort": insertion_sort,
        "Merge Sort": merge_sort,
        "Quick Sort": quick_sort,
        "Heap Sort": heap_sort,
        "Linear Search": linear_search,
        "Binary Search": binary_search,
    }
    
    algo_func = algo_map[selected_algo]
    
    if category == "Searching":
        st.session_state.frames, st.session_state.comparisons, st.session_state.swaps, st.session_state.accesses = \
            algo_func(arr.tolist(), target=search_target, descending=descending)
    else:
        st.session_state.frames, st.session_state.comparisons, st.session_state.swaps, st.session_state.accesses = \
            algo_func(arr.tolist(), descending=descending)
    
    st.session_state.current_frame = 0

# Main Content Area
col1, col2 = st.columns([3, 1])

with col1:
    if st.session_state.frames:
        # Visualization
        fig = create_visualization(
            st.session_state.frames,
            st.session_state.current_frame,
            selected_algo
        )
        st.plotly_chart(fig, use_container_width=True)
        
        # Frame Controls
        st.session_state.current_frame = st.slider(
            "Frame",
            0,
            len(st.session_state.frames) - 1,
            st.session_state.current_frame
        )
        
        # Play/Pause Animation
        col_play, col_speed = st.columns([1, 3])
        with col_play:
            if st.button("▶️ Play Animation"):
                for i in range(st.session_state.current_frame, len(st.session_state.frames)):
                    st.session_state.current_frame = i
                    # Create a placeholder for dynamic updates
                    placeholder = st.empty()
                    fig = create_visualization(
                        st.session_state.frames,
                        st.session_state.current_frame,
                        selected_algo
                    )
                    placeholder.plotly_chart(fig, use_container_width=True)
                    time.sleep(1 / speed)  # Speed control
    else:
        st.info("👈 Select an algorithm and click 'Run Algorithm' to start!")

with col2:
    st.subheader("📊 Statistics")
    st.metric("Comparisons", st.session_state.comparisons)
    st.metric("Swaps", st.session_state.swaps)
    st.metric("Accesses", st.session_state.accesses)
    st.metric("Frames", len(st.session_state.frames))

# Footer
st.markdown("---")
st.markdown("""
**🎓 Learning Tips:**
- Start with small arrays to understand each step
- Use Speed slider to control animation
- Compare different algorithms on the same array
- Watch the statistics to see efficiency differences
""")
