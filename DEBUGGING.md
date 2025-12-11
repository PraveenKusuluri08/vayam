# Debugging Blank White Page

## Steps to Diagnose

### 1. Check Browser Console
- Open Developer Tools (F12 or Cmd+Option+I)
- Go to Console tab
- Look for red error messages
- Share any errors you see

### 2. Check Network Tab
- In Developer Tools, go to Network tab
- Refresh the page
- Check if CSS/JS files are loading (status should be 200)
- Check if any files are failing to load

### 3. Simplified Test

I've created a simplified homepage. If you see:
- ✅ "VAYAM" heading and gold button → Basic rendering works, issue is in components
- ❌ Still blank white → Issue is in layout or CSS

### 4. Test Pages Created

- `/test` - Super simple test page (should show blue background)
- Homepage - Simplified version (should show VAYAM heading)

### 5. Common Issues

1. **CSS not loading** → Check if Tailwind is compiling
2. **JavaScript error** → Check browser console
3. **Component crash** → Check terminal for build errors
4. **Port conflict** → Try different port: `npm run dev -- -p 3001`

### 6. Quick Fixes to Try

```bash
# Clear cache and rebuild
rm -rf .next
npm run build

# Or restart dev server
npm run dev
```

### 7. Check Terminal Output

Look for:
- ✅ "Ready" message
- ✅ Local: http://localhost:3000
- ❌ Error messages
- ❌ Failed to compile

---

**Next Steps:** Share what you see in:
1. Browser console (any errors?)
2. Terminal output (any errors?)
3. Can you see the simplified page or still blank?


