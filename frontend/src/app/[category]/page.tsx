import Image from 'next/image';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_BACKEND || 'http://localhost:8000';

async function getCategoryData(category: string) {
  try {
    // Try with /api prefix first (matches your second code)
    const response = await fetch(`${API_URL}/api/product/category/${category}`, {
      cache: 'no-store',
      credentials: 'include',
    });
    
    if (!response.ok) {
      // If 404, try without /api prefix as fallback
      const fallbackResponse = await fetch(`${API_URL}/product/category/${category}`, {
        cache: 'no-store',
      });
      
      if (!fallbackResponse.ok) {
        return null;
      }
      
      const fallbackResult = await fallbackResponse.json();
      return fallbackResult.success ? fallbackResult.data : null;
    }
    
    const result = await response.json();
    
    // Handle the API response format from your second code
    if (result.success && Array.isArray(result.data)) {
      if (result.data.length > 0) {
        const categoryName = result.data[0]?.child_category_name || 
                           result.data[0]?.slug_name || 
                           category.replace(/-/g, ' ');
        return {
          title: categoryName,
          products: result.data.map((product: any) => ({
            id: product.id,
            name: product.product_name || product.name,
            price: product.price,
            image: product.image_url || product.image,
          }))
        };
      }
    }
    return null;
  } catch (error) {
    console.error('Error fetching category products:', error);
    return null;
  }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const data = await getCategoryData(category);

  if (!data) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Category Not Found</h1>
          <p className="text-gray-600">The category you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/" className="text-blue-600 hover:underline mt-4 inline-block">
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 pt-24">
        <h1 className="text-center text-4xl lg:text-5xl font-bold text-gray-900 mb-16">
          {data.title}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
          {data.products.map((product: any) => (
            <Link
              key={product.id}
              href={`/${category}/${product.id}`}
              className="group"
            >
              <div className="bg-white overflow-hidden transition-all duration-300 hover:scale-105">
                <div className="aspect-square w-full bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
                  <Image
                    src={product.image || '/api/placeholder/400/400'}
                    alt={product.name}
                    width={400}
                    height={400}
                    className="object-cover w-full h-full group-hover:opacity-90 transition-opacity duration-300"
                  />
                </div>
                <div className="pt-4 space-y-2">
                  <h3 className="text-base font-medium text-gray-900 line-clamp-2 group-hover:text-gray-700 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xl font-bold text-gray-900">
                    Rs. {product.price?.toFixed(2) || '0.00'}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}