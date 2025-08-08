# TFG MEMO - React Native Clean Architecture

Una aplicación React Native con **Clean Architecture** y autenticación **Supabase**, construida con **Expo SDK 53** y **TypeScript**.

## 📁 Estructura de carpetas 

### **Domain (Centro de la arquitectura)**
- **entities/**: Objetos de dominio sin dependencias externas
- **specifications/**: Interfaces que definen contratos

### **Application (Casos de uso y estado)**
- **DTO/**: Objetos para transferir datos entre capas
- **stores/**: Estado global con MobX (lógica de presentación)
- **useCases/**: Casos de uso del negocio (lógica pura)
- **modules/**: Organización modular por funcionalidad

### **Infrastructure (Implementaciones técnicas)**
- **implementations/**: Clases que implementan las interfaces del dominio

### **Presentation (UI)**
- **components/**: Componentes reutilizables de UI
- **screens/**: Pantallas de la aplicación
- **hooks/**: Custom hooks para acceso al estado
- **navigation/**: Configuración de React Navigation


## 🚀 Tecnologías

- **React Native** con **Expo SDK 53**
- **TypeScript** para type safety
- **Supabase** para autenticación y backend
- **MobX** para state management reactivo
- **React Navigation** para navegación
- **Clean Architecture** con Dependency Injection

## ⚙️ Configuración

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar Supabase
Crea un archivo `.env` en la raíz del proyecto:

```env
EXPO_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=tu-clave-anonima
EXPO_PUBLIC_API_URL=https://tu-proyecto.supabase.co
EXPO_PUBLIC_APP_NAME=TFG_MEMO
EXPO_PUBLIC_MOCK_MODE=false
```

### 3. Ejecutar la aplicación
```bash
npm start
```

## 🔧 Scripts disponibles

```bash
npm start          # Iniciar servidor de desarrollo
npm run android    # Ejecutar en Android
npm run ios        # Ejecutar en iOS
npm run web        # Ejecutar en web
```

## 📚 Recursos

- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Supabase Documentation](https://supabase.com/docs)
- [MobX Documentation](https://mobx.js.org/)
- [React Navigation](https://reactnavigation.org/)

---

**¡Happy coding!** 🚀
