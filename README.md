
# TFG MEMO - React Native Clean Architecture

A React Native application with **Clean Architecture** and **Supabase** authentication, built using **Expo SDK 53** and **TypeScript**.

## 📁 Folder Structure

### **Domain (Core of the architecture)**
- **entities/**: Domain objects without external dependencies
- **specifications/**: Interfaces defining contracts

### **Application (Use cases and state)**
- **DTO/**: Data Transfer Objects between layers
- **stores/**: Global state with MobX (presentation logic)
- **useCases/**: Business use cases (pure logic)
- **modules/**: Modular organization by functionality

### **Infrastructure (Technical implementations)**
- **implementations/**: Classes implementing domain interfaces

### **Presentation (UI)**
- **components/**: Reusable UI components
- **screens/**: Application screens
- **hooks/**: Custom hooks for state access
- **navigation/**: React Navigation configuration

## 🚀 Technologies

- **React Native** with **Expo SDK 53**
- **TypeScript** for type safety
- **Supabase** for authentication and backend
- **MobX** for reactive state management
- **React Navigation** for navigation
- **Clean Architecture** with Dependency Injection

## ⚙️ Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Configure Supabase
Create a `.env` file in the project root:

```env
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
EXPO_PUBLIC_API_URL=https://your-project.supabase.co
EXPO_PUBLIC_APP_NAME=TFG_MEMO
EXPO_PUBLIC_MOCK_MODE=false
```

### 3. Run the application
```bash
npm start
```

## 🔧 Available Scripts

```bash
npm start          # Start development server
npm run android    # Run on Android
npm run ios        # Run on iOS
npm run web        # Run on web
```

## 📚 Resources

- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Supabase Documentation](https://supabase.com/docs)
- [MobX Documentation](https://mobx.js.org/)
- [React Navigation](https://reactnavigation.org/)

---

**Happy coding!** 🚀
