# SEO Tracker Examples

This directory contains example integrations for different platforms and use cases.

## 📁 Available Examples

1. **basic-html.html** - Simple HTML integration
2. **react-example.jsx** - React/Next.js component
3. **vue-example.vue** - Vue.js component
4. **wordpress-plugin.php** - WordPress plugin
5. **ecommerce-tracking.html** - E-commerce event tracking

## 🚀 Quick Start

### Example 1: Basic HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Basic Tracking Example</title>
</head>
<body>
  <h1>My Website</h1>
  <button id="cta-button">Click Me!</button>

  <script src="https://cdn.jsdelivr.net/gh/Tharshigan-zincat/admin-lib@latest/seo-tracker.js"></script>
  <script>
    // Initialize tracker
    SEOTracker.init({
      apiUrl: 'https://your-domain.com/api/tracking',
      projectId: 'your-project-uuid',
      debug: true
    });

    // Track custom button click
    document.getElementById('cta-button').addEventListener('click', () => {
      SEOTracker.track('cta_click', {
        buttonText: 'Click Me!',
        location: 'hero-section'
      });
    });
  </script>
</body>
</html>
```

### Example 2: React Component

```jsx
import { useEffect } from 'react';

export default function TrackingProvider({ children }) {
  useEffect(() => {
    // Load tracker
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/gh/yourusername/seo-tracker@latest/seo-tracker.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.SEOTracker.init({
        apiUrl: process.env.NEXT_PUBLIC_TRACKING_API,
        projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
        debug: process.env.NODE_ENV === 'development'
      });
    };

    return () => {
      if (window.SEOTracker) {
        window.SEOTracker.destroy();
      }
    };
  }, []);

  return <>{children}</>;
}

// Usage in component
function SignupButton() {
  const handleClick = () => {
    window.SEOTracker?.track('signup_click', {
      source: 'header',
      campaign: 'christmas-sale'
    });
    // ... handle signup
  };

  return <button onClick={handleClick}>Sign Up</button>;
}
```

### Example 3: E-commerce Tracking

```html
<!DOCTYPE html>
<html>
<head>
  <title>E-commerce Store</title>
</head>
<body>
  <div class="product" data-id="12345" data-price="99.99">
    <h2>Awesome Product</h2>
    <button class="add-to-cart">Add to Cart</button>
  </div>

  <script src="https://cdn.jsdelivr.net/gh/Tharshigan-zincat/admin-lib@latest/seo-tracker.js"></script>
  <script>
    SEOTracker.init({
      apiUrl: 'https://your-domain.com/api/tracking',
      projectId: 'your-project-uuid'
    });

    // Track product views
    document.querySelectorAll('.product').forEach(product => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            SEOTracker.track('product_view', {
              productId: product.dataset.id,
              productPrice: product.dataset.price
            });
          }
        });
      });
      observer.observe(product);
    });

    // Track add to cart
    document.querySelectorAll('.add-to-cart').forEach(button => {
      button.addEventListener('click', (e) => {
        const product = e.target.closest('.product');
        SEOTracker.track('add_to_cart', {
          productId: product.dataset.id,
          productPrice: product.dataset.price,
          quantity: 1
        });
      });
    });

    // Track checkout
    function trackCheckout(orderData) {
      SEOTracker.track('checkout', {
        orderId: orderData.id,
        total: orderData.total,
        items: orderData.items.length,
        paymentMethod: orderData.payment
      });
    }
  </script>
</body>
</html>
```

### Example 4: Form Analytics

```html
<form id="contact-form">
  <input type="text" name="name" placeholder="Name">
  <input type="email" name="email" placeholder="Email">
  <textarea name="message" placeholder="Message"></textarea>
  <button type="submit">Send</button>
</form>

<script>
  const form = document.getElementById('contact-form');
  const startTime = Date.now();

  // Track form start
  form.addEventListener('focus', () => {
    SEOTracker.track('form_start', {
      formId: 'contact-form'
    });
  }, { once: true, capture: true });

  // Track field interactions
  form.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('blur', () => {
      SEOTracker.track('field_complete', {
        formId: 'contact-form',
        fieldName: field.name,
        fieldFilled: field.value.length > 0
      });
    });
  });

  // Track form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const timeSpent = (Date.now() - startTime) / 1000;
    
    SEOTracker.track('form_submit', {
      formId: 'contact-form',
      timeSpent: timeSpent,
      fieldsCount: form.elements.length
    });

    // Submit form...
  });
</script>
```

### Example 5: Video Tracking

```html
<video id="promo-video" controls>
  <source src="promo.mp4" type="video/mp4">
</video>

<script>
  const video = document.getElementById('promo-video');
  let trackingMilestones = [25, 50, 75, 100];

  video.addEventListener('play', () => {
    SEOTracker.track('video_play', {
      videoId: 'promo-video',
      videoSrc: video.currentSrc
    });
  });

  video.addEventListener('pause', () => {
    SEOTracker.track('video_pause', {
      videoId: 'promo-video',
      currentTime: Math.floor(video.currentTime),
      duration: Math.floor(video.duration)
    });
  });

  video.addEventListener('timeupdate', () => {
    const percent = (video.currentTime / video.duration) * 100;
    const milestone = trackingMilestones.find(m => percent >= m);
    
    if (milestone) {
      SEOTracker.track('video_progress', {
        videoId: 'promo-video',
        milestone: milestone + '%'
      });
      trackingMilestones = trackingMilestones.filter(m => m !== milestone);
    }
  });

  video.addEventListener('ended', () => {
    SEOTracker.track('video_complete', {
      videoId: 'promo-video',
      duration: Math.floor(video.duration)
    });
  });
</script>
```

### Example 6: Search Tracking

```html
<input type="search" id="site-search" placeholder="Search...">
<div id="search-results"></div>

<script>
  const searchInput = document.getElementById('site-search');
  let searchTimeout;

  searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    
    searchTimeout = setTimeout(() => {
      const query = e.target.value;
      if (query.length > 2) {
        // Perform search...
        const resultsCount = document.querySelectorAll('#search-results .result').length;
        
        SEOTracker.track('search', {
          query: query,
          queryLength: query.length,
          resultsCount: resultsCount,
          hasResults: resultsCount > 0
        });
      }
    }, 500);
  });

  // Track result clicks
  document.getElementById('search-results').addEventListener('click', (e) => {
    if (e.target.classList.contains('result')) {
      SEOTracker.track('search_result_click', {
        query: searchInput.value,
        resultPosition: Array.from(e.target.parentNode.children).indexOf(e.target) + 1,
        resultId: e.target.dataset.id
      });
    }
  });
</script>
```

## 🎯 Best Practices

1. **Initialize Once** - Call `init()` only once per page
2. **Use Descriptive Event Names** - `signup_click` instead of `click1`
3. **Include Context** - Add relevant details to each event
4. **Respect Privacy** - Don't track sensitive information
5. **Test in Debug Mode** - Enable debug during development
6. **Flush Before Navigation** - Call `flush()` before redirects

## 📊 Common Event Patterns

### User Authentication
```javascript
SEOTracker.track('signup_start', { method: 'email' });
SEOTracker.track('signup_complete', { userId: '123', method: 'email' });
SEOTracker.track('login', { method: 'google' });
SEOTracker.track('logout', {});
```

### Content Engagement
```javascript
SEOTracker.track('article_read', { articleId: '456', readTime: 120 });
SEOTracker.track('share', { platform: 'twitter', contentId: '789' });
SEOTracker.track('comment', { contentId: '789' });
```

### Navigation
```javascript
SEOTracker.track('menu_click', { menuItem: 'products' });
SEOTracker.track('tab_switch', { fromTab: 'overview', toTab: 'pricing' });
SEOTracker.track('filter_apply', { filterType: 'category', filterValue: 'electronics' });
```

## 🔧 Troubleshooting

### Events Not Sending
- Check browser console for errors
- Verify `apiUrl` and `projectId` are correct
- Check network tab for failed requests
- Enable debug mode: `debug: true`

### Too Many Events
- Disable auto-tracking: `trackClicks: false`
- Use custom events only for important actions
- Implement debouncing for frequent events

### Privacy Concerns
- Respect DNT: Automatically handled
- Provide opt-out: `SEOTracker.setOptOut(true)`
- Anonymize data: Don't track PII in event details

## 📚 Additional Resources

- [Full Documentation](../README.md)
- [API Reference](../README.md#api-reference)
- [TypeScript Definitions](../seo-tracker.d.ts)
- [GitHub Repository](https://github.com/yourusername/seo-tracker)

---

Need help? [Open an issue](https://github.com/yourusername/seo-tracker/issues) or check the [discussions](https://github.com/yourusername/seo-tracker/discussions).
