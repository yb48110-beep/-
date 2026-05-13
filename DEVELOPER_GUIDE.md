# دليل المطور - Youssef Trading App 👨‍💻

## 📌 مقدمة

هذا الدليل يساعدك في فهم وتطوير منصة يوسف للتداول بشكل احترافي.

---

## 🏗️ معمارية التطبيق

```
┌─────────────────────────────────────┐
│         App.jsx (الرئيسي)           │
│     (التبويبات والملاحة)            │
└──────────────┬──────────────────────┘
               │
      ┌────────┼────────┐
      ▼        ▼        ▼
  Dashboard TradingDashboard TodoApp
   (لوحة)    (تداول)      (مهام)
```

---

## 🔧 مبادئ التطوير

### 1️⃣ **إضافة ميزة جديدة**

```javascript
// 1. إنشاء مكون جديد في src/components/MyFeature.jsx
import React, { useState } from 'react';
import '../styles/MyFeature.css';

export default function MyFeature() {
  const [data, setData] = useState(null);

  return (
    <div className="feature-container">
      {/* محتوى الميزة */}
    </div>
  );
}

// 2. إنشاء أنماط في src/styles/MyFeature.css
.feature-container {
  padding: 20px;
  /* أنماط هنا */
}

// 3. استيراد في App.jsx وإضافة التبويب
```

### 2️⃣ **التعامل مع State**

```javascript
// استخدام useState
const [tasks, setTasks] = useState([]);
const [filter, setFilter] = useState('all');

// تحديث الحالة
setTasks([...tasks, newTask]);

// حفظ في localStorage
useEffect(() => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}, [tasks]);
```

### 3️⃣ **الأنماط والمتغيرات**

```css
/* استخدام متغيرات CSS */
color: var(--text-primary);
background: var(--bg-card);
border: 1px solid var(--border-color);

/* Dark Mode */
:root {
  --text-primary: #ffffff;
  --bg-dark: #0f172a;
}

/* Light Mode */
html.light-mode {
  --text-primary: #1e293b;
  --bg-dark: #f8fafc;
}
```

---

## 📚 البنية الكاملة للمشروع

```
src/
├── components/
│   ├── App.jsx                 # المكون الرئيسي
│   │   ├── التبويبات الثلاثة
│   │   ├── تبديل الوضع
│   │   └── الملاحة
│   │
│   ├── Dashboard.jsx           # لوحة التحكم
│   │   ├── بطاقات الإحصائيات
│   │   ├── الرسم البياني
│   │   └── جدول العمليات
│   │
│   ├── TradingDashboard.jsx    # منصة التداول
│   │   ├── لوحة التداول
│   │   ├── شبكة الأصول
│   │   └── معلومات السوق
│   │
│   ├── TodoApp.jsx             # نظام المهام
│   │   ├── إدخال المهام
│   │   ├── عرض المهام
│   │   └── الإحصائيات
│   │
│   └── مكونات مساعدة...
│
└── styles/
    └── أنماط CSS لكل مكون
```

---

## 🔄 دورة حياة المكون

```javascript
// 1. الدخول الأولي
useEffect(() => {
  // تحميل البيانات
  const saved = localStorage.getItem('data');
  if (saved) setData(JSON.parse(saved));
}, []); // تشغيل مرة واحدة

// 2. التحديث
useEffect(() => {
  // حفظ التغييرات
  localStorage.setItem('data', JSON.stringify(data));
}, [data]); // تشغيل عند تغيير data
```

---

## 🎨 نظام الألوان

### الألوان الأساسية

```javascript
const colors = {
  primary: '#667eea',      // أزرق بنفسجي
  secondary: '#764ba2',    // بنفسجي
  success: '#10b981',      // أخضر
  danger: '#ef4444',       // أحمر
  warning: '#f59e0b',      // برتقالي
  info: '#3b82f6',         // أزرق
};
```

### أمثلة الاستخدام

```css
/* للنصوص الإيجابية */
color: var(--success-color);

/* للخلفيات */
background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);

/* للحدود */
border: 1px solid var(--border-color);
```

---

## 🚀 تحسين الأداء

### 1️⃣ **استخدام Lazy Loading**

```javascript
const Dashboard = React.lazy(() => import('./Dashboard'));

<Suspense fallback={<Loading />}>
  <Dashboard />
</Suspense>
```

### 2️⃣ **استخدام useMemo**

```javascript
const filteredTasks = useMemo(() => {
  return tasks.filter(t => t.status === filter);
}, [tasks, filter]);
```

### 3️⃣ **تقليل إعادة الرسم**

```javascript
// استخدام React.memo
const TaskItem = React.memo(({ task, onToggle }) => {
  return <div onClick={() => onToggle(task.id)}>{task.text}</div>;
});
```

---

## 🧪 اختبار المكونات

```javascript
// مثال اختبار بسيط
test('يجب أن يضيف مهمة جديدة', () => {
  const { getByText, getByPlaceholderText } = render(<TodoApp />);
  const input = getByPlaceholderText('أضف مهمة جديدة...');
  const button = getByText('إضافة');

  fireEvent.change(input, { target: { value: 'اختبار' } });
  fireEvent.click(button);

  expect(getByText('اختبار')).toBeInTheDocument();
});
```

---

## 📦 إدارة المكتبات

### إضافة مكتبة جديدة

```bash
# تثبيت المكتبة
npm install package-name

# أو للتطوير فقط
npm install --save-dev package-name
```

### حذف مكتبة

```bash
npm uninstall package-name
```

### تحديث المكتبات

```bash
npm update
npm audit fix
```

---

## 🐛 معالجة الأخطاء

```javascript
// Error Boundary
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h1>حدث خطأ!</h1>;
    }
    return this.props.children;
  }
}
```

---

## 🔐 الأمان

### ✅ أفضل الممارسات

- استخدام `textContent` بدلاً من `innerHTML`
- التحقق من المدخلات
- استخدام HTTPS في الإنتاج
- عدم تخزين بيانات حساسة في localStorage

```javascript
// ❌ غير آمن
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// ✅ آمن
<div>{userInput}</div>
```

---

## 📱 الاستجابة (Responsive)

### Breakpoints المشروع

```css
/* الهاتف الذكي */
@media (max-width: 480px) {
  .container { grid-template-columns: 1fr; }
}

/* التابليت */
@media (max-width: 768px) {
  .container { grid-template-columns: 1fr 1fr; }
}

/* الديسكتوب */
@media (min-width: 1024px) {
  .container { grid-template-columns: repeat(4, 1fr); }
}
```

---

## 🎯 أمثلة شاملة

### مثال 1️⃣: إضافة عنصر جديد

```javascript
// src/components/NewFeature.jsx
import React, { useState, useEffect } from 'react';
import '../styles/NewFeature.css';

export default function NewFeature() {
  const [items, setItems] = useState([]);

  // تحميل البيانات
  useEffect(() => {
    const saved = localStorage.getItem('items');
    if (saved) setItems(JSON.parse(saved));
  }, []);

  // حفظ البيانات
  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  const addItem = (text) => {
    setItems([...items, { id: Date.now(), text }]);
  };

  return (
    <div className="feature">
      <h1>الميزة الجديدة</h1>
      <button onClick={() => addItem('عنصر جديد')}>إضافة</button>
      <ul>
        {items.map(item => <li key={item.id}>{item.text}</li>)}
      </ul>
    </div>
  );
}
```

### مثال 2️⃣: معالجة النموذج

```javascript
const [form, setForm] = useState({ name: '', email: '' });

const handleChange = (e) => {
  const { name, value } = e.target;
  setForm(prev => ({ ...prev, [name]: value }));
};

const handleSubmit = (e) => {
  e.preventDefault();
  console.log('البيانات:', form);
  // إرسال البيانات
};

return (
  <form onSubmit={handleSubmit}>
    <input
      name="name"
      value={form.name}
      onChange={handleChange}
      placeholder="الاسم"
    />
    <button type="submit">إرسال</button>
  </form>
);
```

---

## 📊 الإحصائيات والتحليلات

```javascript
// حساب المتوسط
const average = items.reduce((sum, item) => sum + item.value, 0) / items.length;

// العد
const count = items.filter(item => item.status === 'active').length;

// التجميع
const grouped = items.reduce((acc, item) => {
  acc[item.category] = (acc[item.category] || 0) + 1;
  return acc;
}, {});
```

---

## 🚢 الإطلاق (Deployment)

### على Vercel

```bash
# تثبيت CLI
npm i -g vercel

# الإطلاق
vercel
```

### على Netlify

```bash
# بناء المشروع
npm run build

# رفع المجلد dist
```

---

## 📝 ملاحظات مهمة

✅ **استخدم دائماً:**
- Components functional
- Hooks للحالة
- CSS Modules أو CSS-in-JS
- Local Storage للحفظ المحلي

❌ **تجنب:**
- Class Components (استخدم Functional)
- State عام (استخدم Props)
- jQuery أو Vanilla JS معقد
- Global Variables

---

## 🔗 الموارد المفيدة

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [MDN Web Docs](https://developer.mozilla.org)
- [JavaScript ES6+](https://es6.io)

---

**آخر تحديث:** 2026-05-13 ✨

