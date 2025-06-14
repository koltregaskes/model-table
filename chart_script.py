import plotly.graph_objects as go
import plotly.express as px
import json

# Data from the provided JSON
data = {
    "components": [
        {"name": "Data Sources", "type": "data", "items": ["model_list.csv", "model_list_headers.csv", "last-updated.txt"]},
        {"name": "Frontend", "type": "frontend", "items": ["index.html", "style.css", "app.js"]},
        {"name": "Features", "type": "features", "items": ["Interactive Table", "Search & Filter", "Dynamic Tags", "Export CSV", "Theme Toggle", "Responsive Design"]},
        {"name": "Security", "type": "security", "items": ["Input Sanitization", "CSP Headers", "HTTPS", "XSS Protection"]},
        {"name": "Deployment", "type": "deployment", "items": ["GitHub Repository", "GitHub Actions", "GitHub Pages", "Custom Domain"]}
    ],
    "flow": [
        {"from": "Data Sources", "to": "Frontend", "label": "CSV Loading"},
        {"from": "Frontend", "to": "Features", "label": "User Interface"},
        {"from": "Features", "to": "Security", "label": "Input Processing"},
        {"from": "Frontend", "to": "Deployment", "label": "Static Files"},
        {"from": "Deployment", "to": "Users", "label": "HTTPS Delivery"}
    ]
}

# Define positions for components in a logical flow
positions = {
    "Data Sources": (1, 4),
    "Frontend": (3, 4),
    "Features": (5, 5),
    "Security": (7, 5),
    "Deployment": (5, 2),
    "Users": (7, 2)
}

# Color mapping for different types
type_colors = {
    "data": "#1FB8CD",      # Strong cyan
    "frontend": "#FFC185",   # Light orange
    "features": "#ECEBD5",   # Light green
    "security": "#5D878F",   # Cyan
    "deployment": "#D2BA4C", # Moderate yellow
    "users": "#B4413C"       # Moderate red
}

# Symbol mapping for different types
type_symbols = {
    "data": "square",
    "frontend": "circle",
    "features": "diamond",
    "security": "triangle-up",
    "deployment": "hexagon",
    "users": "star"
}

fig = go.Figure()

# Add component nodes
for component in data["components"]:
    name = component["name"]
    comp_type = component["type"]
    x, y = positions[name]
    
    # Abbreviate long names for display
    display_name = name
    if len(display_name) > 15:
        if "Data Sources" in display_name:
            display_name = "Data Sources"
        elif "Deployment" in display_name:
            display_name = "Deploy"
    
    # Create hover text with items
    items_text = "<br>".join([item[:12] + "..." if len(item) > 12 else item 
                             for item in component["items"][:6]])  # Limit to 6 items
    hover_text = f"<b>{name}</b><br>{items_text}"
    
    fig.add_trace(go.Scatter(
        x=[x], y=[y],
        mode='markers+text',
        marker=dict(
            size=30,
            color=type_colors[comp_type],
            symbol=type_symbols[comp_type],
            line=dict(width=2, color='white')
        ),
        text=[display_name],
        textposition="middle center",
        hovertemplate=hover_text + "<extra></extra>",
        name=comp_type.title(),
        showlegend=True,
        textfont=dict(size=10, color='black')
    ))

# Add Users node
fig.add_trace(go.Scatter(
    x=[positions["Users"][0]], y=[positions["Users"][1]],
    mode='markers+text',
    marker=dict(
        size=30,
        color=type_colors["users"],
        symbol=type_symbols["users"],
        line=dict(width=2, color='white')
    ),
    text=["Users"],
    textposition="middle center",
    hovertemplate="<b>Users</b><br>End Users<br>Developers<extra></extra>",
    name="Users",
    showlegend=True,
    textfont=dict(size=10, color='black')
))

# Add flow arrows
for flow in data["flow"]:
    from_pos = positions[flow["from"]]
    to_pos = positions[flow["to"]]
    
    # Add arrow line
    fig.add_trace(go.Scatter(
        x=[from_pos[0], to_pos[0]],
        y=[from_pos[1], to_pos[1]],
        mode='lines',
        line=dict(width=2, color='#13343B'),
        hovertemplate=f"<b>{flow['label']}</b><extra></extra>",
        showlegend=False
    ))
    
    # Add arrow head (small triangle)
    # Calculate arrow direction
    dx = to_pos[0] - from_pos[0]
    dy = to_pos[1] - from_pos[1]
    length = (dx**2 + dy**2)**0.5
    
    # Normalize and scale
    if length > 0:
        dx_norm = dx / length * 0.3
        dy_norm = dy / length * 0.3
        
        # Arrow head position (closer to target)
        arrow_x = to_pos[0] - dx_norm
        arrow_y = to_pos[1] - dy_norm
        
        fig.add_trace(go.Scatter(
            x=[arrow_x],
            y=[arrow_y],
            mode='markers',
            marker=dict(
                size=8,
                color='#13343B',
                symbol='triangle-right'
            ),
            showlegend=False,
            hoverinfo='skip'
        ))

# Update layout
fig.update_layout(
    title="AI Models Dashboard Architecture",
    xaxis=dict(
        showgrid=False,
        showticklabels=False,
        zeroline=False,
        range=[0, 8]
    ),
    yaxis=dict(
        showgrid=False,
        showticklabels=False,  
        zeroline=False,
        range=[1, 6]
    ),
    legend=dict(
        orientation='h',
        yanchor='bottom',
        y=1.05,
        xanchor='center',
        x=0.5
    ),
    plot_bgcolor='white',
    paper_bgcolor='white'
)

# Save the chart
fig.write_image("dashboard_architecture.png")