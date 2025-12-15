# Implementation Plan - Eyesee Native

## Current Status: ✅ Dashboard Working

### Completed:
- [x] Login & Authentication
- [x] Dashboard page with header
- [x] Navigation menu
- [x] CCTV grid layout
- [x] Backend API connection

---

## Phase 1: Core Functionality (Priority: HIGH)

### Task 1.1: Fix CCTV Card Frame Images
**Status:** Not Started  
**Priority:** HIGH  
**Estimated Time:** 30 minutes

**Issue:** Frame images (frame.png, frame-active.png) not rendering on cards

**Steps:**
1. Check if images are in public/images/
2. Verify image paths in StreamCard component
3. Test with different CSS approaches (absolute positioning vs normal)
4. Ensure z-index is correct

**Files to modify:**
- `src/components/StreamCard/index.tsx`

---

### Task 1.2: Create CCTV Detail Page
**Status:** Not Started  
**Priority:** CRITICAL  
**Estimated Time:** 2 hours

**Goal:** Users can click a camera card and see fullscreen view

**Steps:**
1. Create `src/pages/CctvDetail.tsx`
2. Add route in `src/App.tsx`: `/cctv/:id`
3. Fetch camera data by ID
4. Show fullscreen stream with controls
5. Add back button to return to dashboard

**Files to create:**
- `src/pages/CctvDetail.tsx`

**Files to modify:**
- `src/App.tsx` (add route)
- `src/components/StreamCard/index.tsx` (ensure Link works)

**API Endpoints needed:**
- `GET /api/secure/cctv/:id` (get single camera)

---

### Task 1.3: Fix StreamFullScreenModal
**Status:** Not Started  
**Priority:** MEDIUM  
**Estimated Time:** 1 hour

**Goal:** Expand button on cards opens modal with fullscreen view

**Steps:**
1. Check if Modal component is properly imported
2. Verify modal state management
3. Test expand button functionality
4. Ensure modal can be closed

**Files to modify:**
- `src/components/Modal/StreamModal.tsx` (may need Next.js fixes)
- `src/components/StreamCard/index.tsx` (expand button logic)
- `src/components/layouts/DashboardLayout.tsx` (modal container)

---

## Phase 2: Additional Routes (Priority: MEDIUM)

### Task 2.1: Body-Worm Camera Page
**Status:** Not Started  
**Priority:** MEDIUM  
**Estimated Time:** 1 hour

**Steps:**
1. Create `src/pages/BodyWorm.tsx`
2. Copy Dashboard structure
3. Filter cameras by type = 3 (body_worm)
4. Add route `/body-worm`

**Files to create:**
- `src/pages/BodyWorm.tsx`

---

### Task 2.2: Helmet Camera Page
**Status:** Not Started  
**Priority:** MEDIUM  
**Estimated Time:** 1 hour

**Steps:**
1. Create `src/pages/Helmet.tsx`
2. Copy Dashboard structure
3. Filter cameras by type = 2 (helmet)
4. Add route `/helmet`

**Files to create:**
- `src/pages/Helmet.tsx`

---

## Phase 3: Management Pages (Priority: LOW-MEDIUM)

### Task 3.1: Management Dashboard
**Status:** Not Started  
**Priority:** MEDIUM  
**Estimated Time:** 3 hours

**Steps:**
1. Create `src/pages/manage/Dashboard.tsx`
2. Add layout configuration UI
3. Drag & drop grid customization
4. Save layout to backend

---

### Task 3.2: CCTV Management (CRUD)
**Status:** Not Started  
**Priority:** MEDIUM  
**Estimated Time:** 4 hours

**Steps:**
1. Create `src/pages/manage/Cctv.tsx`
2. List all cameras
3. Add/Edit/Delete camera forms
4. Test CRUD operations

---

## Phase 4: Polish & Optimization (Priority: LOW)

### Task 4.1: Error Handling
- Add error boundaries
- Show user-friendly error messages
- Handle network failures gracefully

### Task 4.2: Loading States
- Add skeleton loaders
- Improve loading indicators
- Add retry mechanisms

### Task 4.3: Performance
- Optimize re-renders
- Lazy load routes
- Image optimization

---

## Immediate Next Step:

**I recommend starting with Task 1.1 (Fix Frame Images)**  
**Then Task 1.2 (CCTV Detail Page)**

This gives users a complete viewing experience before adding more routes.

**Do you want me to proceed with Task 1.1 or 1.2?**
