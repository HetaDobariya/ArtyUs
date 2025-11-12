// Centralized product data for all categories

export interface Product {
  id: number;
  name: string;
  price: number;
  company: string;
  description: string;
  quantity: number;
  details: string;
  image: string;
  category: string;
}

export const allProducts: Product[] = [
  // Pencils
  { id: 1, name: 'HB Pencils Pack of 10', price: 50.00, company: 'Apsara Stationery', description: 'High-quality HB pencils perfect for writing and drawing. Smooth graphite core ensures even lines.', quantity: 10, details: 'Pack of 10 premium HB pencils with eraser tips', image: '/image/HomeImages/vect.png', category: 'pencils' },
  { id: 2, name: 'Premium Graphite Pencils', price: 120.00, company: 'Faber-Castell', description: 'Professional grade graphite pencils for artists and designers.', quantity: 5, details: 'Set of 6 graphite pencils (2H, HB, 2B, 4B, 6B, 8B)', image: '/image/HomeImages/vect.png', category: 'pencils' },
  { id: 3, name: 'Sketching Pencil Set', price: 200.00, company: 'Camlin Art', description: 'Complete sketching set for artists with various hardness grades.', quantity: 12, details: '12 piece professional sketching pencil set', image: '/image/HomeImages/vect.png', category: 'pencils' },
  { id: 4, name: 'Mechanical Pencils', price: 150.00, company: 'Pentel', description: 'Precision mechanical pencils with comfortable grip for extended use.', quantity: 3, details: 'Pack of 3 mechanical pencils with lead refills', image: '/image/HomeImages/vect.png', category: 'pencils' },

  // Pens
  { id: 5, name: 'Ballpoint Pen Set', price: 60.00, company: 'Reynolds', description: 'Smooth writing ballpoint pens for everyday use.', quantity: 10, details: 'Pack of 10 blue ballpoint pens', image: '/image/HomeImages/vect.png', category: 'pens' },
  { id: 6, name: 'Gel Pens Pack of 10', price: 120.00, company: 'Uniball', description: 'Vibrant gel pens with smooth ink flow.', quantity: 10, details: '10 assorted color gel pens', image: '/image/HomeImages/vect.png', category: 'pens' },
  { id: 7, name: 'Premium Fountain Pen', price: 250.00, company: 'Parker', description: 'Elegant fountain pen for professional writing.', quantity: 1, details: 'Premium fountain pen with gold nib', image: '/image/HomeImages/vect.png', category: 'pens' },
  { id: 8, name: 'Colored Pen Set', price: 150.00, company: 'Cello', description: 'Bright colored pens for creative writing and drawing.', quantity: 12, details: '12 vibrant colored pens', image: '/image/HomeImages/vect.png', category: 'pens' },

  // Sharpeners
  { id: 9, name: 'Metal Sharpener Pack', price: 30.00, company: 'Faber-Castell', description: 'Durable metal sharpeners with sharp blades.', quantity: 5, details: 'Pack of 5 metal sharpeners', image: '/image/HomeImages/vect.png', category: 'sharpeners' },
  { id: 10, name: 'Electric Sharpener', price: 250.00, company: 'Staedtler', description: 'Automatic electric sharpener for quick sharpening.', quantity: 1, details: 'Electric sharpener with auto-stop feature', image: '/image/HomeImages/vect.png', category: 'sharpeners' },
  { id: 11, name: 'Dual Hole Sharpener', price: 45.00, company: 'Apsara', description: 'Two hole sizes for different pencil types.', quantity: 3, details: 'Dual hole sharpener for standard and jumbo pencils', image: '/image/HomeImages/vect.png', category: 'sharpeners' },
  { id: 12, name: 'Pencil Sharpener Set', price: 80.00, company: 'Camlin', description: 'Complete set of sharpeners for all needs.', quantity: 6, details: 'Set of 6 different size sharpeners', image: '/image/HomeImages/vect.png', category: 'sharpeners' },

  // Erasers
  { id: 13, name: 'Standard Erasers Pack', price: 30.00, company: 'Apsara', description: 'Non-dust erasers for clean erasing.', quantity: 10, details: 'Pack of 10 white erasers', image: '/image/HomeImages/vect.png', category: 'erasers' },
  { id: 14, name: 'Pencil & Ink Eraser', price: 45.00, company: 'Faber-Castell', description: 'Dual sided eraser for pencil and ink.', quantity: 5, details: '2-in-1 pencil and ink eraser', image: '/image/HomeImages/vect.png', category: 'erasers' },
  { id: 15, name: 'Art Eraser Set', price: 80.00, company: 'Staedtler', description: 'Professional art erasers for precise work.', quantity: 4, details: 'Set of 4 art erasers with different types', image: '/image/HomeImages/vect.png', category: 'erasers' },
  { id: 16, name: 'Dust-Free Erasers', price: 60.00, company: 'Camlin', description: 'Clean erasing without residue.', quantity: 8, details: 'Pack of 8 dust-free erasers', image: '/image/HomeImages/vect.png', category: 'erasers' },

  // Geometric Tools
  { id: 17, name: 'Geometry Box Set', price: 120.00, company: 'Camlin', description: 'Complete geometry set for students.', quantity: 1, details: 'Full geometry box with compass, divider, protractor, and rulers', image: '/image/HomeImages/vect.png', category: 'geometric-tools' },
  { id: 18, name: 'Compass & Divider', price: 80.00, company: 'Faber-Castell', description: 'Precision compass and divider set.', quantity: 2, details: 'Metal compass and divider pair', image: '/image/HomeImages/vect.png', category: 'geometric-tools' },
  { id: 19, name: 'Mathematical Instruments', price: 200.00, company: 'Staedtler', description: 'Professional mathematical instrument set.', quantity: 1, details: 'Complete set with all mathematical tools', image: '/image/HomeImages/vect.png', category: 'geometric-tools' },
  { id: 20, name: 'Protractor & Ruler Set', price: 60.00, company: 'Apsara', description: 'Basic protractor and ruler combo.', quantity: 2, details: 'Transparent protractor with 30cm ruler', image: '/image/HomeImages/vect.png', category: 'geometric-tools' },

  // Exam Boards
  { id: 21, name: 'Clipboard Board', price: 100.00, company: 'Office Mart', description: 'Sturdy clipboard for exams and writing.', quantity: 1, details: 'A4 size clipboard with clip', image: '/image/HomeImages/vect.png', category: 'exam-boards' },
  { id: 22, name: 'Exam Writing Board', price: 150.00, company: 'Supreme', description: 'Lightweight writing board for exams.', quantity: 1, details: 'Smooth surface exam board', image: '/image/HomeImages/vect.png', category: 'exam-boards' },
  { id: 23, name: 'Portable Desk Board', price: 180.00, company: 'Student Choice', description: 'Portable desk board with storage.', quantity: 1, details: 'Exam board with pencil holder', image: '/image/HomeImages/vect.png', category: 'exam-boards' },
  { id: 24, name: 'Premium Exam Board', price: 220.00, company: 'Pro Write', description: 'Premium quality exam writing board.', quantity: 1, details: 'Ergonomic design exam board', image: '/image/HomeImages/vect.png', category: 'exam-boards' },

  // Glue and Adhesives
  { id: 25, name: 'White Glue Stick', price: 40.00, company: 'Fevicol', description: 'Non-toxic glue stick for paper crafts.', quantity: 3, details: 'Pack of 3 glue sticks 20g each', image: '/image/HomeImages/vect.png', category: 'glue-and-adhesives' },
  { id: 26, name: 'Super Glue Pack', price: 80.00, company: 'Fevikwik', description: 'Instant bonding super glue.', quantity: 5, details: 'Pack of 5 super glue tubes', image: '/image/HomeImages/vect.png', category: 'glue-and-adhesives' },
  { id: 27, name: 'Craft Adhesive Set', price: 120.00, company: 'Camlin', description: 'Multi-purpose craft adhesive set.', quantity: 1, details: 'Set with different types of adhesives', image: '/image/HomeImages/vect.png', category: 'glue-and-adhesives' },
  { id: 28, name: 'Glue Gun with Sticks', price: 200.00, company: 'Hot Melt', description: 'Electric glue gun with glue sticks.', quantity: 1, details: 'Glue gun with 10 glue sticks', image: '/image/HomeImages/vect.png', category: 'glue-and-adhesives' },

  // Desk Supplies
  { id: 29, name: 'Desk Organizer', price: 250.00, company: 'Office Pro', description: 'Multi-compartment desk organizer for better organization.', quantity: 1, details: 'Wooden desk organizer with 5 compartments', image: '/image/HomeImages/vect.png', category: 'desk-supplies' },
  { id: 30, name: 'Paper Clips & Pins', price: 50.00, company: 'Office Mart', description: 'Essential paper clips and pins for organizing documents.', quantity: 100, details: 'Mixed pack of paper clips and push pins', image: '/image/HomeImages/vect.png', category: 'desk-supplies' },
  { id: 31, name: 'Staplers & Staples', price: 120.00, company: 'Kangaro', description: 'Heavy-duty stapler with staples for binding documents.', quantity: 1, details: 'Stapler with 1000 staples included', image: '/image/HomeImages/vect.png', category: 'desk-supplies' },
  { id: 32, name: 'Desk Accessories Kit', price: 350.00, company: 'Office Pro', description: 'Complete desk accessories set for professionals.', quantity: 1, details: 'Includes organizer, pen stand, tape dispenser, and more', image: '/image/HomeImages/vect.png', category: 'desk-supplies' },

  // Color Pencils
  { id: 33, name: '12 Color Pencils Set', price: 80.00, company: 'Camlin Art', description: 'Vibrant color pencils with smooth blending capabilities.', quantity: 12, details: '12 assorted bright colors with strong leads', image: '/image/HomeImages/vect.png', category: 'color-pencils' },
  { id: 34, name: '24 Premium Color Pencils', price: 180.00, company: 'Faber-Castell', description: 'Professional color pencils for artists.', quantity: 24, details: '24 rich colors with smooth application', image: '/image/HomeImages/vect.png', category: 'color-pencils' },
  { id: 35, name: '48 Artist Color Pencils', price: 350.00, company: 'Staedtler', description: 'Wide range of colors for professional artwork.', quantity: 48, details: '48 premium colors in metal tin', image: '/image/HomeImages/vect.png', category: 'color-pencils' },
  { id: 36, name: 'Professional Color Set', price: 500.00, company: 'Prismacolor', description: 'Top-tier color pencils for professional artists.', quantity: 72, details: '72 colors with superior pigmentation', image: '/image/HomeImages/vect.png', category: 'color-pencils' },

  // Water Colors
  { id: 37, name: '12 Water Color Set', price: 150.00, company: 'Camlin', description: 'Basic watercolor set for beginners.', quantity: 12, details: '12 vibrant water color cakes', image: '/image/HomeImages/vect.png', category: 'water-colors' },
  { id: 38, name: '24 Premium Water Colors', price: 280.00, company: 'Brustro', description: 'Rich watercolors for detailed artwork.', quantity: 24, details: '24 professional grade water colors', image: '/image/HomeImages/vect.png', category: 'water-colors' },
  { id: 39, name: 'Artist Water Color Kit', price: 450.00, company: 'Winsor & Newton', description: 'Professional watercolor set with brushes.', quantity: 18, details: '18 colors with 3 brushes and palette', image: '/image/HomeImages/vect.png', category: 'water-colors' },
  { id: 40, name: 'Professional Water Colors', price: 600.00, company: 'Sennelier', description: 'Premium watercolors for professional artists.', quantity: 24, details: '24 tubes of artist grade watercolors', image: '/image/HomeImages/vect.png', category: 'water-colors' },

  // Crayon Colors
  { id: 41, name: '64 Crayon Colors', price: 600.00, company: 'Pala art mart', description: 'Unleash creativity with our vibrant crayons—where every hue sparks imagination in a single stroke.', quantity: 3, details: 'A set of 240 shades of vibrant crayon colors', image: '/image/HomeImages/vect.png', category: 'crayon-colors' },
  { id: 42, name: 'Crayola crayon colors', price: 360.00, company: 'Crayola', description: 'Classic crayons loved by kids and adults.', quantity: 64, details: '64 bright and bold colors', image: '/image/HomeImages/vect.png', category: 'crayon-colors' },
  { id: 43, name: '24 Jumbo Crayons', price: 250.00, company: 'Camlin', description: 'Extra thick crayons for small hands.', quantity: 24, details: '24 jumbo size crayons', image: '/image/HomeImages/vect.png', category: 'crayon-colors' },
  { id: 44, name: 'Washable Crayon Set', price: 180.00, company: 'Faber-Castell', description: 'Easy to wash off from hands and surfaces.', quantity: 36, details: '36 washable crayons', image: '/image/HomeImages/vect.png', category: 'crayon-colors' },

  // Poster Colors
  { id: 45, name: '12 Poster Colors', price: 180.00, company: 'Camlin', description: 'Bright poster colors for school projects.', quantity: 12, details: '12 vibrant poster color bottles', image: '/image/HomeImages/vect.png', category: 'poster-colors' },
  { id: 46, name: '24 Bright Poster Colors', price: 320.00, company: 'Brustro', description: 'Professional poster colors with rich pigmentation.', quantity: 24, details: '24 bright poster paint colors', image: '/image/HomeImages/vect.png', category: 'poster-colors' },
  { id: 47, name: 'Premium Poster Paint', price: 450.00, company: 'Fevicryl', description: 'High-quality poster paints for artists.', quantity: 20, details: '20 premium acrylic poster colors', image: '/image/HomeImages/vect.png', category: 'poster-colors' },
  { id: 48, name: 'Fluorescent Poster Set', price: 280.00, company: 'Camlin', description: 'Bright fluorescent colors that glow.', quantity: 10, details: '10 neon fluorescent poster colors', image: '/image/HomeImages/vect.png', category: 'poster-colors' },

  // Add more products for other categories...
  // Sketch Pens, Markers, Color Palette, Paint Brushes, Craft Papers, Diaries, Kits etc.
];

export const getCategoryData = (category: string) => {
  const products = allProducts.filter(p => p.category === category);
  
  if (products.length === 0) {
    return null;
  }

  // Generate title from category name
  const title = category
    .split('-')
    .map(word => word.toUpperCase())
    .join(' ');

  return {
    title,
    products: products.map(p => ({
      id: p.id,
      name: p.name,
      price: p.price,
      image: p.image,
    }))
  };
};

export const getProductById = (id: number): Product | undefined => {
  return allProducts.find(p => p.id === id);
};

