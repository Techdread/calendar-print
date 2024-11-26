# Personalized Calendar Generator

A modern, responsive web application built with React, Material UI, and Vite that allows users to create beautiful, customized calendars with personal images for each month.

## Features

- **Customizable Year Selection**: Choose any year to generate your calendar
- **Full A4 Format**: Perfect for printing, with proper page breaks and layout
- **Image Customization**:
  - Upload personal images for each month
  - Cover page with customizable background
  - Back cover with customizable background
  - Drag and drop support for easy image uploads
  - Image preview before confirmation
- **Professional Layout**:
  - One month per page in A4 format
  - Large image display area
  - Clean, modern calendar grid at the bottom
  - Current day highlighting
  - Responsive design for all screen sizes
- **Print Ready**:
  - Optimized for A4 paper
  - Automatic page breaks
  - Print-friendly styling
  - Hidden UI elements in print mode

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd calendar-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

1. **Select Year**:
   - Enter your desired year in the input field at the top

2. **Customize Images**:
   - Click the camera icon on any month to upload an image
   - Click on the cover page area to set a cover image
   - Click on the back cover area to set a back cover image
   - Drag and drop images directly onto the upload areas

3. **Preview and Print**:
   - Use the print button in the top-right corner
   - Your calendar will print with:
     - Custom front cover
     - 12 months (one per page)
     - Custom back cover

## Built With

- [React](https://reactjs.org/) - Frontend framework
- [Vite](https://vitejs.dev/) - Build tool and development server
- [Material UI](https://mui.com/) - UI component library
- [date-fns](https://date-fns.org/) - Date manipulation library
- [Zustand](https://github.com/pmndrs/zustand) - State management

## Technical Details

- Responsive design using Material UI's Grid system
- Local storage for persisting images and settings
- A4 page format (210mm × 297mm)
- Print-specific CSS optimizations
- Modern ES6+ JavaScript

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
