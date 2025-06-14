import plotly.graph_objects as go
from plotly.subplots import make_subplots
import plotly.express as px

# Parse the data
data = {
  "features": {
    "Core Features": [
      {"name": "Interactive Table", "value": 15, "max": 15, "unit": "models", "status": "complete"},
      {"name": "Search & Filter", "value": 100, "max": 100, "unit": "%", "status": "complete"},
      {"name": "Provider Tags", "value": 8, "max": 10, "unit": "providers", "status": "active"},
      {"name": "Export Options", "value": 2, "max": 3, "unit": "formats", "status": "active"},
      {"name": "Themes", "value": 2, "max": 2, "unit": "modes", "status": "complete"}
    ],
    "Performance": [
      {"name": "Load Time", "value": 2.1, "max": 3.0, "unit": "seconds", "status": "excellent"},
      {"name": "Mobile Score", "value": 95, "max": 100, "unit": "%", "status": "excellent"},
      {"name": "Accessibility", "value": 98, "max": 100, "unit": "%", "status": "excellent"},
      {"name": "SEO Score", "value": 92, "max": 100, "unit": "%", "status": "good"}
    ],
    "Security": [
      {"name": "Input Sanitization", "value": 100, "max": 100, "unit": "%", "status": "secure"},
      {"name": "CSP Headers", "value": 100, "max": 100, "unit": "%", "status": "secure"},
      {"name": "HTTPS Only", "value": 100, "max": 100, "unit": "%", "status": "secure"},
      {"name": "XSS Protection", "value": 100, "max": 100, "unit": "%", "status": "secure"}
    ],
    "Compatibility": [
      {"name": "Modern Browsers", "value": 100, "max": 100, "unit": "%", "status": "supported"},
      {"name": "Mobile Devices", "value": 100, "max": 100, "unit": "%", "status": "supported"},
      {"name": "Screen Sizes", "value": 5, "max": 5, "unit": "ranges", "status": "responsive"},
      {"name": "GitHub Pages", "value": 100, "max": 100, "unit": "%", "status": "compatible"}
    ]
  }
}

# Color palette
colors = ['#1FB8CD', '#FFC185', '#ECEBD5', '#5D878F', '#D2BA4C']

# Create subplots for dashboard layout
fig = make_subplots(
    rows=2, cols=2,
    subplot_titles=('Core Features', 'Performance', 'Security', 'Compatibility'),
    specs=[[{"type": "bar"}, {"type": "bar"}],
           [{"type": "bar"}, {"type": "bar"}]],
    vertical_spacing=0.12,
    horizontal_spacing=0.1
)

# Function to calculate completion percentage
def calc_completion(feature):
    if feature['name'] == 'Load Time':
        # For load time, lower is better
        return round(((feature['max'] - feature['value']) / feature['max']) * 100)
    else:
        return round((feature['value'] / feature['max']) * 100)

# Function to create display text
def create_display_text(feature):
    if feature['unit'] == '%':
        return f"{feature['value']}{feature['unit']}"
    elif feature['unit'] == 'seconds':
        return f"{feature['value']}s"
    else:
        return f"{feature['value']}/{feature['max']}"

# Category positions
positions = {
    'Core Features': (1, 1),
    'Performance': (1, 2), 
    'Security': (2, 1),
    'Compatibility': (2, 2)
}

category_colors = {
    'Core Features': colors[0],
    'Performance': colors[1], 
    'Security': colors[2],
    'Compatibility': colors[3]
}

# Add bars for each category
for category, features in data['features'].items():
    row, col = positions[category]
    
    # Prepare data for this category
    feature_names = []
    percentages = []
    display_texts = []
    hover_texts = []
    
    for feature in features:
        # Shorten names to fit character limit
        short_name = feature['name'][:12]
        if len(feature['name']) > 12:
            short_name = feature['name'][:12] + "..."
        feature_names.append(short_name)
        
        completion = calc_completion(feature)
        percentages.append(completion)
        
        display_text = create_display_text(feature)
        display_texts.append(display_text)
        
        hover_text = f"{feature['name']}<br>Value: {display_text}<br>Status: {feature['status']}<br>Completion: {completion}%"
        hover_texts.append(hover_text)
    
    # Add horizontal bar chart for this category
    fig.add_trace(
        go.Bar(
            name=category,
            y=feature_names,
            x=percentages,
            orientation='h',
            marker_color=category_colors[category],
            text=display_texts,
            textposition='auto',
            hovertemplate='%{hovertext}<extra></extra>',
            hovertext=hover_texts,
            cliponaxis=False,
            showlegend=False
        ),
        row=row, col=col
    )
    
    # Update subplot axes
    fig.update_xaxes(
        range=[0, 105],
        title_text="Completion %",
        row=row, col=col
    )
    fig.update_yaxes(
        title_text="Features",
        row=row, col=col
    )

# Create summary statistics
total_features = sum(len(features) for features in data['features'].values())
completed_features = 0
for features in data['features'].values():
    for feature in features:
        if calc_completion(feature) == 100:
            completed_features += 1

overall_completion = round((completed_features / total_features) * 100)

# Update overall layout
fig.update_layout(
    title=f'AI Dashboard Overview - {overall_completion}% Complete',
    font=dict(size=10),
    showlegend=False
)

# Save the chart
fig.write_image('ai_dashboard_features.png')