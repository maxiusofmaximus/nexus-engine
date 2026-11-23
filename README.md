# Nexus Engine

Motor de juegos universal con IA integrada que permite crear experiencias interactivas de manera sencilla y potente.

## 🚀 Características

- **Motor Universal**: Soporte para múltiples engines gráficos
- **IA Integrada**: Asistente inteligente para desarrollo
- **Arquitectura Modular**: Componentes reutilizables y extensibles
- **Sistema de Palabras Clave**: Interacción natural con el motor
- **Múltiples Engines**: Soporte para Three.js, Babylon.js, Kaplay, Phaser, PixiJS y próximamente Unity, Unreal, Godot y Cave

## 📁 Estructura del Proyecto

```
nexus-engine/
├── src/
│   ├── components/     # Componentes reutilizables
│   ├── models/         # Modelos de datos
│   ├── controllers/    # Controladores de lógica
│   ├── services/       # Servicios y APIs
│   ├── utils/          # Utilidades
│   ├── hooks/          # Hooks personalizados
│   ├── engines/        # Implementaciones de engines
│   └── systems/        # Sistemas del motor
├── public/             # Archivos públicos
├── docs/               # Documentación
└── package.json
```

## 🛠️ Instalación

```bash
npm install
```

## 🚀 Uso

```bash
# Desarrollo
npm run dev

# Producción
npm start

# Construir
npm run build

# Pruebas
npm test
```

## 📖 Documentación

La documentación completa está disponible en la carpeta `docs/` y se puede generar con:

```bash
npm run docs
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Binario y código bajo la licencia propietaria de [LICENSE](LICENSE).