# 📊 SEO Tracker

> Lightweight, privacy-first JavaScript tracking library for capturing user behavior and web analytics

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://badge.fury.io/js/seo-tracker.svg)](https://www.npmjs.com/package/seo-tracker)
[![Size](https://img.shields.io/bundlephobia/minzip/seo-tracker)](https://bundlephobia.com/package/seo-tracker)

## ✨ Features

- 🚀 **Lightweight** - Less than 5KB minified and gzipped
- 🔒 **Privacy-First** - Respects DNT, provides opt-out, anonymizes IPs
- 📦 **Zero Dependencies** - Pure vanilla JavaScript
- 🎯 **Auto-Tracking** - Page views, clicks, scrolls, and visibility
- 🛠️ **Flexible** - Track custom events with any data
- 🌐 **Universal** - Works with HTML, React, Vue, WordPress, etc.
- 📊 **Batching** - Efficient event queuing and transmission
- 💾 **Session Tracking** - Persistent session IDs
- 📱 **Responsive** - Captures device and viewport info

## 📦 Installation

### Via CDN (jsDelivr)

```html
<script src="https://cdn.jsdelivr.net/gh/Tharshigan-zincat/admin-lib@latest/seo-tracker.js"></script>
```

### Via CDN (unpkg)

```html
<script src="https://unpkg.com/seo-tracker@latest/seo-tracker.min.js"></script>
```

### Via npm

```bash
npm install seo-tracker
```

### Via GitHub Raw

```html
<script src="https://raw.githubusercontent.com/Tharshigan-zincat/admin-lib/main/seo-tracker.js"></script>
```

## 🚀 Quick Start

### Basic HTML Integration

```html
<!DOCTYPE html>
<html>
<head>
  <title>My Website</title>
</head>
<body>
  <h1>Welcome!</h1>

  <!-- Load tracker -->
  <script src="https://cdn.jsdelivr.net/gh/Tharshigan-zincat/admin-lib@latest/seo-tracker.js"></script>
  
  <!-- Initialize -->
  <script>
    SEOTracker.init({
      apiUrl: 'https://your-domain.com/api/tracking',
      projectId: 'your-project-uuid-here',
      debug: true  // Set false in production
    });
  </script>
</body>
</html>
```

### React/Next.js Integration

```javascript
// In your _app.js or root component
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Load tracker script
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/gh/yourusername/seo-tracker@latest/seo-tracker.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.SEOTracker.init({
        apiUrl: 'https://your-domain.com/api/tracking',
        projectId: 'your-project-uuid',
        debug: false
      });
    };

    return () => document.body.removeChild(script);
  }, []);

  return <Component {...pageProps} />;
}
```

### Vue.js Integration

```javascript
// In your main.js or App.vue
export default {
  mounted() {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/gh/yourusername/seo-tracker@latest/seo-tracker.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.SEOTracker.init({
        apiUrl: 'https://your-domain.com/api/tracking',
        projectId: 'your-project-uuid'
      });
    };
  }
}
```

### WordPress Integration

Add to your theme's `footer.php` before the closing `</body>` tag:

```php
<script src="https://cdn.jsdelivr.net/gh/Tharshigan-zincat/admin-lib@latest/seo-tracker.js"></script>
<script>
  SEOTracker.init({
    apiUrl: 'https://your-domain.com/api/tracking',
    projectId: '<?php echo get_option('seo_tracker_project_id'); ?>'
  });
</script>
```

## 📖 API Reference

### Configuration Options

```javascript
SEOTracker.init({
  apiUrl: string,           // Required: API endpoint URL
  projectId: string,        // Required: Project UUID from admin panel
  debug: boolean,           // Optional: Enable console logs (default: false)
  trackClicks: boolean,     // Optional: Auto-track clicks (default: true)
  trackScroll: boolean,     // Optional: Auto-track scroll (default: true)
  trackVisibility: boolean, // Optional: Auto-track visibility (default: true)
  trackUnload: boolean      // Optional: Auto-track page unload (default: true)
});
```

### Methods

#### `SEOTracker.track(eventType, details)`

Track a custom event:

```javascript
SEOTracker.track('button_click', {
  buttonId: 'signup',
  variant: 'primary',
  campaign: 'summer-sale'
});

SEOTracker.track('purchase', {
  productId: 'ABC123',
  price: 99.99,
  quantity: 2
});

SEOTracker.track('video_play', {
  videoId: 'promo-video',
  timestamp: 0
});
```

#### `SEOTracker.flush()`

Manually send all queued events immediately:

```javascript
await SEOTracker.flush();
```

#### `SEOTracker.setOptOut(value)`

Set user opt-out preference:

```javascript
// Opt out of tracking
SEOTracker.setOptOut(true);

// Opt back in
SEOTracker.setOptOut(false);
```

#### `SEOTracker.destroy()`

Clean up and destroy the tracker:

```javascript
SEOTracker.destroy();
```

#### `SEOTracker.version`

Get library version:

```javascript
console.log(SEOTracker.version); // "1.0.0"
```

## 🎯 Auto-Tracked Events

The library automatically tracks the following events:

### Page Views
Captured on page load with:
- URL and path
- Page title
- Referrer
- User agent
- Screen dimensions
- Viewport size
- Language
- Timezone

### Click Events
Captured for all clicks with:
- Element tag name
- Element ID
- Element classes
- Text content (first 100 chars)

### Scroll Depth
Milestones tracked at:
- 25% scroll
- 50% scroll
- 75% scroll
- 90% scroll

### Tab Visibility
Tracked when user:
- Switches tabs
- Minimizes browser
- Returns to tab

### Page Unload
Tracked when user leaves the page

## 🔒 Privacy & Compliance

### Do Not Track (DNT)
Automatically respects browser DNT settings:
```javascript
// No tracking if DNT is enabled
```

### User Opt-Out
Persistent opt-out stored in localStorage:
```html
<button onclick="SEOTracker.setOptOut(true)">
  Don't Track Me
</button>
```

### IP Anonymization
The backend automatically anonymizes IP addresses before storage.

### GDPR Compliance
- User consent can be implemented before initialization
- Opt-out mechanism provided
- All data stored securely
- User can request data deletion

## 🛠️ Advanced Usage

### Conditional Tracking

```javascript
// Only track in production
if (window.location.hostname !== 'localhost') {
  SEOTracker.init({
    apiUrl: 'https://your-domain.com/api/tracking',
    projectId: 'your-project-uuid'
  });
}
```

### Custom Event Examples

```javascript
// Form submission
document.querySelector('form').addEventListener('submit', (e) => {
  SEOTracker.track('form_submit', {
    formId: e.target.id,
    fields: Array.from(e.target.elements).map(el => el.name)
  });
});

// Search tracking
document.querySelector('#search').addEventListener('input', (e) => {
  SEOTracker.track('search', {
    query: e.target.value,
    resultsCount: document.querySelectorAll('.result').length
  });
});

// Download tracking
document.querySelectorAll('a[download]').forEach(link => {
  link.addEventListener('click', () => {
    SEOTracker.track('download', {
      filename: link.getAttribute('download'),
      href: link.href
    });
  });
});
```

### TypeScript Support

```typescript
import SEOTracker, { SEOTrackerConfig } from 'seo-tracker';

const config: SEOTrackerConfig = {
  apiUrl: 'https://your-domain.com/api/tracking',
  projectId: 'your-project-uuid',
  debug: true
};

SEOTracker.init(config);

SEOTracker.track('custom_event', {
  property: 'value'
});
```

## 📊 Data Structure

Events sent to your API:

```javascript
{
  projectId: "uuid-string",
  events: [
    {
      type: "page_view",
      details: {
        title: "Home Page",
        sessionId: "sess_abc123",
        // ... other details
      },
      path: "/",
      url: "https://example.com/",
      referrer: "https://google.com",
      ts: "2025-12-31T00:00:00.000Z"
    }
  ]
}
```

## 🚧 Browser Support

- Chrome/Edge 60+
- Firefox 60+
- Safari 12+
- Opera 47+
- Modern mobile browsers

## 🔧 Development

### Setup

```bash
git clone https://github.com/Tharshigan-zincat/admin-lib.git
cd seo-tracker
npm install
```

### Build

```bash
npm run build
```

Creates:
- `dist/seo-tracker.js` - UMD bundle
- `dist/seo-tracker.esm.js` - ES Module
- `dist/seo-tracker.min.js` - Minified version

## 📝 Examples

Check the `/examples` directory for:
- Basic HTML integration
- React app integration
- Vue.js integration
- WordPress plugin
- E-commerce tracking
- Form analytics

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) first.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT © [Tharshigan](https://github.com/Tharshigan-zincat)

See [LICENSE](LICENSE) for details.

## 🙏 Acknowledgments

- Inspired by modern analytics solutions
- Built with privacy and performance in mind
- Community feedback and contributions

## 📧 Support

- 📖 [Documentation](https://github.com/Tharshigan-zincat/admin-lib/wiki)
- 🐛 [Issue Tracker](https://github.com/Tharshigan-zincat/admin-lib/issues)
- 💬 [Discussions](https://github.com/Tharshigan-zincat/admin-lib/discussions)

## 🔗 Links

- [GitHub Repository](https://github.com/Tharshigan-zincat/admin-lib)
- [npm Package](https://www.npmjs.com/package/seo-tracker)
- [Admin Dashboard](https://your-domain.com)
- [Live Demo](https://your-domain.com/example.html)

---

Made with ❤️ by [Tharshigan](https://github.com/Tharshigan-zincat)
