import { notFound } from "next/navigation";
//import { products } from "../../../lib/products";
import ProductPageBanner from "../../../components/common/ProductPageBanner";
import ProductTabs from "../../../components/products/ProductTabs";
import RelatedProducts from "../../../components/products/RelatedProducts";
import { Facebook, Linkedin, Twitter, Star } from "lucide-react";
import Gallery from "./Gallery";
import ProductActions from "../../../components/products/ProductActions";
import { Cormorant_Garamond, Jost } from "next/font/google";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500"] });
const jost = Jost({ subsets: ["latin"], weight: ["300", "400", "600"] });

// export async function generateStaticParams() {
//   return products.map((product) => ({ id: String(product.id) }));
// }


type Product = {
  _id: string;
  title: string;
  image: string;
  gallery?: string[];
  price: number;
  oldPrice?: number;
  category: string;
  sku: string;
  description: string;
  tags?: string[];
  rating?: number;
  reviewsCount?: number;
  colors?: string[];
  sizes?: string[];
};

async function getProduct(id: string): Promise<Product | null> {
  const res = await fetch(`${process.env.API_URL}/products/${id}`, {
    { cache: "no-store" }
  });

  if (!res.ok) return null;
  return res.json();
}

// type Props = { params: Promise<{ id: string }> };

type Props = {
  params: { id: string };
};


export default async function ProductPage({ params }: Props) {
const { id } = params;
const product = await getProduct(id);

// const product = await getProduct(params.id);
   if (!product) return notFound();
   
  // const product = products.find((p) => p.id === Number(id));
  // if (!product) return notFound();

  const rating = product.rating ?? 5;
  const reviews = product.reviewsCount ?? 0;

  return (
    <div className={`bg-[#fcfaf7] ${jost.className}`}>
      <ProductPageBanner category={product.category} product={product.title} />


      <section className="max-w-[1440px] mx-auto px-6 md:px-16 py-12 md:py-20">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          
          {/* GALLERY SIDE */}
          <div className="flex-1">
             <Gallery
              images={
                product.gallery && product.gallery.length > 0
                  ? product.gallery
                  : [product.image]
              }
              title={product.title}
            />
          </div>

          {/* DETAILS SIDE */}
          <div className="flex-1 space-y-8">
            <header className="space-y-4">
              <p className="text-[10px] uppercase tracking-[0.5em] text-amber-700 font-bold">
                Handcrafted Excellence
              </p>
              <h1 className={`${cormorant.className} text-4xl md:text-6xl text-stone-900 leading-tight`}>
                {product.title}
              </h1>
              
              <div className="flex items-center gap-4">
                <span className="text-2xl text-stone-800">
                  ₹ {product.price.toLocaleString()}
                </span>
                {product.oldPrice && (
                  <span className="text-lg text-stone-400 line-through font-light">
                    ₹ {product.oldPrice.toLocaleString()}
                  </span>
                )}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-4 pt-2">
                <div className="flex gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      fill={i + 1 <= Math.floor(rating) ? "currentColor" : "none"}
                      className="stroke-amber-500"
                    />
                  ))}
                </div>
                <span className="text-[10px] uppercase tracking-widest text-stone-400">
                  {reviews} verified reviews
                </span>
              </div>
            </header>

            <p className="text-stone-500 leading-relaxed text-base max-w-lg italic font-light">
              "{product.description}"
            </p>

            <div className="py-8 border-y border-stone-200">
              <ProductActions product={product} />
            </div>

            {/* Meta & Social */}
            <div className="space-y-4 pt-4">
              <Meta label="Identifier" value={product.sku} />
              <Meta label="Collection" value={product.category} />
              <Meta label="Artisan Tags" value={product.tags?.join(", ") ?? product.category} />

              <div className="flex items-center gap-6 pt-6">
                <span className="text-[10px] uppercase tracking-widest text-stone-400 w-20">Share Piece</span>
                <div className="flex gap-4 text-stone-400">
                  <Facebook size={18} className="hover:text-stone-900 cursor-pointer transition-colors" />
                  <Twitter size={18} className="hover:text-stone-900 cursor-pointer transition-colors" />
                  <Linkedin size={18} className="hover:text-stone-900 cursor-pointer transition-colors" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-[#f3f1ee]">
         <ProductTabs product={product} />
      </div>
      <RelatedProducts />
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center text-[11px] uppercase tracking-widest">
      <span className="text-stone-400 w-20">{label}</span>
      <span className="text-stone-900 font-semibold">: {value}</span>
    </div>
  );
}
