# 🔧 STREAM FIX ATTEMPT - Using Object/Embed Tag

**Approach:** Replace iframe with object/embed tag  
**Reason:** Some Electron versions block iframes but allow object tags

---

## Test This in StreamCard:

Replace iframe with:

```tsx
<object
  data={`${MEDIAMTX_URL}/${path_slug}`}
  type="text/html"
  className="w-full h-full pointer-events-auto border-none"
>
  <p>Stream not available</p>
</object>
```

Or try embed:

```tsx
<embed
  src={`${MEDIAMTX_URL}/${path_slug}`}
  type="text/html"
  className="w-full h-full pointer-events-auto border-none"
/>
```

---

## If that doesn't work, try opening in external window:

```tsx
<button onClick={() => window.open(`${MEDIAMTX_URL}/${path_slug}`, '_blank')}>
  Open Stream
</button>
```

This will open MediaMTX in separate window which should work.
