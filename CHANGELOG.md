# Changelog

All notable changes to the SEO Tracker library will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-12-31

### 🎉 Initial Release

#### Added
- ✨ Core tracking library with zero dependencies
- 📊 Automatic page view tracking on initialization
- 🖱️ Automatic click event tracking
- 📄 Automatic scroll depth tracking (25%, 50%, 75%, 90%)
- 👁️ Automatic tab visibility change tracking
- 🚪 Automatic page unload tracking
- 🎯 Custom event tracking API
- 💾 Event batching and queue management
- ⚡ Automatic flush every 5 seconds
- 🔒 Privacy-first features:
  - Do Not Track (DNT) support
  - User opt-out mechanism with localStorage persistence
  - IP anonymization on server side
- 🗂️ Session tracking with persistent session IDs
- 📱 Device and viewport information capture
- 🌍 Timezone and language detection
- 🔧 Debug mode for development
- 📦 Multiple module format support (UMD, ESM, browser global)
- 📘 TypeScript definitions included
- 📖 Comprehensive documentation
- 🎨 Multiple integration examples (HTML, React, Vue, WordPress)
- 🛠️ Configuration options:
  - `apiUrl` - API endpoint
  - `projectId` - Project identifier
  - `debug` - Debug logging
  - `trackClicks` - Enable/disable click tracking
  - `trackScroll` - Enable/disable scroll tracking
  - `trackVisibility` - Enable/disable visibility tracking
  - `trackUnload` - Enable/disable unload tracking

#### API Methods
- `init(config)` - Initialize tracker
- `track(eventType, details)` - Track custom events
- `flush()` - Manually send queued events
- `setOptOut(value)` - Set opt-out preference
- `destroy()` - Clean up and destroy instance
- `version` - Get library version

#### Browser Support
- Chrome/Edge 60+
- Firefox 60+
- Safari 12+
- Opera 47+
- Modern mobile browsers

#### Documentation
- README.md with full installation and usage guide
- EXAMPLES.md with 6+ integration examples
- GITHUB_SETUP.md with publishing instructions
- TypeScript definitions for IDE autocomplete
- MIT License

### 🔜 Coming Soon
- React hooks package
- Vue composables
- WordPress plugin
- Google Analytics migration guide
- Event sampling for high-traffic sites
- Offline event queue persistence

---

## Version History

- **v1.0.0** (2025-12-31) - Initial release

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

## Support

- [GitHub Issues](https://github.com/yourusername/seo-tracker/issues)
- [Discussions](https://github.com/yourusername/seo-tracker/discussions)
- [Documentation](https://github.com/yourusername/seo-tracker#readme)
