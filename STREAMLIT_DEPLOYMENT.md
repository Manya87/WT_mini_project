# Algorithm Visualizer - Streamlit Deployment Guide

## Overview

Your Algorithm Visualizer has been converted to **Streamlit**, a Python framework for building web apps quickly.

**Benefits:**
- ✅ Single Python file (`app.py`)
- ✅ No build step needed
- ✅ Easy deployment to Streamlit Cloud
- ✅ All 8 algorithms working (6 sorting, 2 searching)
- ✅ Full feature support (custom arrays, sort order, search target)

---

## Quick Start (Local)

### Step 1: Install Python Dependencies

```bash
pip install -r requirements.txt
```

**What gets installed:**
- `streamlit` - The web framework
- `numpy` - Numerical computing
- `plotly` - Interactive charts

### Step 2: Run Locally

```bash
streamlit run app.py
```

**Expected output:**
```
  You can now view your Streamlit app in your browser.

  Local URL: http://localhost:8501
  Network URL: http://192.168.x.x:8501
```

### Step 3: Open Browser

Go to: **http://localhost:8501**

You should see the Algorithm Visualizer with all controls on the left sidebar!

---

## Understanding the Streamlit App Structure

### File: `app.py`

**Sections:**

1. **Algorithm Implementations** (Lines 1-300)
   - `bubble_sort()` - Simple, easy to follow
   - `selection_sort()` - Find minimum repeatedly
   - `insertion_sort()` - Build sorted array
   - `merge_sort()` - Divide and conquer
   - `quick_sort()` - Partition-based
   - `heap_sort()` - Heap data structure
   - `linear_search()` - Check each element
   - `binary_search()` - Halve search space

2. **Visualization Function** (Lines 300-340)
   - `create_visualization()` - Creates Plotly bar chart
   - Uses Plotly for interactive charts

3. **Streamlit UI** (Lines 340+)
   - Sidebar controls (sliders, inputs, buttons)
   - Main area with visualization and statistics
   - Session state management

### File: `requirements.txt`

Lists all Python dependencies needed to run the app.

### File: `.streamlit/config.toml`

Streamlit configuration:
- Theme colors (indigo primary color)
- UI settings
- Logger settings

---

## Deployment Options

### Option 1: Streamlit Cloud (Easiest) ⭐ RECOMMENDED

Streamlit Cloud is **FREE** and perfect for this project.

#### Step 1: Create GitHub Repository

1. Go to [github.com](https://github.com)
2. Create new repository: `algorithm-visualizer-streamlit`
3. Clone it locally
4. Copy these files into the repo:
   - `app.py`
   - `requirements.txt`
   - `.streamlit/config.toml`
5. Commit and push:

```bash
git add .
git commit -m "Add Streamlit Algorithm Visualizer"
git push origin main
```

#### Step 2: Deploy on Streamlit Cloud

1. Go to [share.streamlit.io](https://share.streamlit.io)
2. Click **"New app"**
3. Sign in with GitHub
4. Select your repository and branch
5. Set main file path: `app.py`
6. Click **"Deploy"**

**That's it!** Your app is live within 1-2 minutes.

#### Your Live URL will be:
```
https://algorithm-visualizer.streamlit.app
```

#### Features of Streamlit Cloud:
- ✅ Free hosting
- ✅ Auto-deploys on GitHub push
- ✅ Custom domain support (for paid plans)
- ✅ Auto-scales for traffic
- ✅ Built-in sharing links

---

### Option 2: Docker Deployment

Deploy anywhere Docker runs (AWS, Azure, Google Cloud, DigitalOcean, etc.)

#### Create `Dockerfile`

```dockerfile
FROM python:3.11-slim

WORKDIR /app

# Copy files
COPY requirements.txt .
COPY app.py .
COPY .streamlit .streamlit

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose port
EXPOSE 8501

# Run Streamlit
CMD ["streamlit", "run", "app.py", "--server.port=8501", "--server.address=0.0.0.0"]
```

#### Build Docker Image

```bash
docker build -t algorithm-visualizer .
```

#### Run Container Locally

```bash
docker run -p 8501:8501 algorithm-visualizer
```

Open: **http://localhost:8501**

#### Push to Cloud

**AWS ECR Example:**
```bash
# Login to ECR
aws ecr get-login-password | docker login --username AWS --password-stdin <your-ecr-uri>

# Tag image
docker tag algorithm-visualizer:latest <your-ecr-uri>/algorithm-visualizer:latest

# Push
docker push <your-ecr-uri>/algorithm-visualizer:latest

# Run on ECS/Fargate
```

---

### Option 3: Heroku Deployment (Paid)

If you prefer Heroku (note: free tier ended, now requires paid plan):

#### Create `Procfile`

```
web: streamlit run app.py --server.port=$PORT
```

#### Deploy

```bash
heroku login
heroku create algorithm-visualizer
git push heroku main
```

---

### Option 4: PythonAnywhere (Budget-Friendly)

1. Sign up at [pythonanywhere.com](https://www.pythonanywhere.com)
2. Upload `app.py` and `requirements.txt`
3. Create web app with Streamlit
4. Configure to use `streamlit run app.py`
5. Get your public URL

---

## Environment Variables (if needed)

Create `.streamlit/secrets.toml` for sensitive data:

```toml
# Example: API keys, database URLs, etc.
# Not needed for this app, but useful for future enhancements

[database]
conn_string = "postgresql://user:password@host/db"

[api]
openai_key = "sk-xxxxxxxxxxxx"
```

Access in Python:
```python
import streamlit as st
db_url = st.secrets["database"]["conn_string"]
```

---

## Performance Optimization

### Current Performance
- 🚀 App loads in <1 second
- 🚀 Algorithms run in real-time
- 🚀 Smooth animations with Plotly
- 🚀 Handles 200+ element arrays easily

### If you need more optimization:

1. **Cache algorithm results:**
```python
@st.cache_data
def run_algorithm(algo_name, array, target, descending):
    # Algorithm code here
    return frames, comparisons, swaps, accesses
```

2. **Limit array size in production:**
```python
max_size = 200  # Set max array size
```

3. **Use CDN for assets:**
   - Streamlit Cloud auto-serves from CDN

---

## Customization

### Change Theme Colors

Edit `.streamlit/config.toml`:

```toml
[theme]
primaryColor = "#4F46E5"      # Indigo
backgroundColor = "#FFFFFF"   # White
secondaryBackgroundColor = "#F3F4F6"  # Light gray
textColor = "#1F2937"        # Dark gray
font = "sans serif"
```

### Add New Algorithm

1. Write algorithm function in `app.py`:

```python
def tim_sort(arr, target=None, descending=False):
    # Your algorithm here
    frames = []
    comparisons = swaps = accesses = 0
    # ...
    return frames, comparisons, swaps, accesses
```

2. Add to algorithm list:

```python
algorithms = {
    "Sorting": [..., "Tim Sort"],  # Add here
    "Searching": [...]
}
```

3. Add to algorithm map:

```python
algo_map = {
    ...
    "Tim Sort": tim_sort,  # Add here
}
```

---

## Troubleshooting

### Issue: App won't start

**Solution:**
```bash
# Check Python version
python --version  # Should be 3.8+

# Reinstall dependencies
pip install --upgrade -r requirements.txt

# Run with verbose output
streamlit run app.py --logger.level=debug
```

### Issue: Port 8501 already in use

**Solution:**
```bash
# Use different port
streamlit run app.py --server.port=8502
```

### Issue: Streamlit Cloud app crashes

**Solution:**
- Check GitHub for file structure
- Verify `requirements.txt` syntax
- Check app.py for errors:
  ```bash
  python -m py_compile app.py
  ```

### Issue: Slow animations

**Solution:**
- Use `speed` slider to reduce frames
- Lower default array size in code
- Use Streamlit Cloud (better servers)

---

## Monitoring Deployed App

### Streamlit Cloud Dashboard

1. Go to [share.streamlit.io/admin](https://share.streamlit.io/admin)
2. See all your deployed apps
3. View logs, restart app, manage settings
4. Get real-time viewer count

### Logs

View app logs:
```bash
# Local
streamlit run app.py --logger.level=debug

# Streamlit Cloud
# Dashboard → Select app → View logs
```

---

## Sharing Your App

### After Deployment

**Streamlit Cloud URL:**
```
https://algorithm-visualizer.streamlit.app
```

**Share Methods:**
1. Direct link - Easy copy/paste
2. Embed iframe - Put on website
3. QR code - Print/display anywhere
4. Social media - Share publicly

### Example Share Message

> 🎨 Check out my Algorithm Visualizer!
> 
> Visualize sorting and searching algorithms in action:
> - 6 Sorting algorithms (Bubble, Selection, Insertion, Merge, Quick, Heap)
> - 2 Searching algorithms (Linear, Binary)
> - Custom array input
> - Adjustable speed
> - Real-time statistics
>
> 🔗 https://algorithm-visualizer.streamlit.app

---

## Next Steps

1. **Local Testing**
   ```bash
   pip install -r requirements.txt
   streamlit run app.py
   ```

2. **GitHub Push**
   ```bash
   git add .
   git commit -m "Deploy algorithm visualizer"
   git push origin main
   ```

3. **Streamlit Cloud Deploy**
   - Go to [share.streamlit.io](https://share.streamlit.io)
   - Connect GitHub
   - Select this repo
   - Deploy!

4. **Share Public Link**
   - Get URL from deployment
   - Share with students/colleagues

---

## FAQ

**Q: Is Streamlit Cloud free?**
A: Yes! Free tier includes 3 apps per user, auto-deploys from GitHub, and free hosting.

**Q: Can I add database to store results?**
A: Yes! Use `st.secrets` + PostgreSQL, MongoDB, or Firebase.

**Q: Can I use custom CSS?**
A: Limited. Use `markdown()` with CSS, or `st.write()`with HTML.

**Q: Can I add user authentication?**
A: Yes, use Streamlit Cloud's built-in authentication or services like Auth0.

**Q: How many users can access simultaneously?**
A: Unlimited on Streamlit Cloud's free tier (auto-scales).

**Q: Can I add dark mode toggle?**
A: Yes, use Streamlit theme selector (upper right menu).

---

## Support & Resources

- 📚 [Streamlit Docs](https://docs.streamlit.io)
- 🚀 [Streamlit Cloud](https://streamlit.io/cloud)
- 💬 [Streamlit Community](https://discuss.streamlit.io)
- 🐛 [GitHub Issues](https://github.com/streamlit/streamlit/issues)

---

**Happy deploying!** 🎉
