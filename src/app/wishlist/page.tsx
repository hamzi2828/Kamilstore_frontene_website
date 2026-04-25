"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
  Heart, ShoppingCart, Trash2, Share2, ArrowRight,
  ShoppingBag, Package,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";
import ProductImage from "@/components/ui/ProductImage";
import Breadcrumb from "@/components/ui/Breadcrumb";
import "@/styling/WishlistPage.css";
import { useWishlist } from "@/lib/wishlist-context";
import { useCart } from "@/lib/cart-context";

const PLACEHOLDER =
  "https://png.pngtree.com/png-vector/20241018/ourmid/pngtree-running-shoes-or-sneakers-on-a-transparent-background-png-image_14112954.png";

export default function WishlistPage() {
  const { items, isReady, isAuthenticated, removeItem, refresh } = useWishlist();
  const { addItem: addToCartItem } = useCart();

  // Pull latest server wishlist for logged-in users on mount
  useEffect(() => {
    if (isAuthenticated) refresh();
  }, [isAuthenticated, refresh]);

  const addToCart = (productId: string) => {
    const item = items.find((i) => i.productId === productId);
    if (!item) return;
    addToCartItem({
      productId: item.productId,
      slug: item.slug,
      name: item.name,
      image: item.image,
      sellingPrice: item.sellingPrice,
      unitPrice: item.unitPrice,
      stock: item.inStock ? 99 : 0,
      quantity: 1,
      vendor: item.vendor,
    });
  };

  const addAllToCart = () => {
    for (const item of items) {
      if (!item.inStock) continue;
      addToCartItem({
        productId: item.productId,
        slug: item.slug,
        name: item.name,
        image: item.image,
        sellingPrice: item.sellingPrice,
        unitPrice: item.unitPrice,
        stock: 99,
        quantity: 1,
        vendor: item.vendor,
      });
    }
  };

  const inStockCount = items.filter((i) => i.inStock).length;

  if (!isReady) {
    return (
      <>
        <Breadcrumb items={[{ label: "Wishlist" }]} />
        <div className="flex flex-col gap-5 sm:gap-6 pt-4 sm:pt-5 pb-20 sm:pb-28">
          <section className="site-container">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "48px 0",
                color: "#9CA3AF",
                fontSize: 14,
              }}
            >
              Loading wishlist...
            </div>
          </section>
        </div>
      </>
    );
  }

  if (items.length === 0) {
    return (
      <>
        <Breadcrumb items={[{ label: "Wishlist" }]} />
        <div className="flex flex-col gap-5 sm:gap-6 pt-4 sm:pt-5 pb-20 sm:pb-28">
          <section className="site-container">
            <div className="ks-wl-empty-card">
              <div className="ks-wl-empty-icon-box">
                <Heart className="w-10 h-10 text-[#ddd]" />
              </div>
              <h1 className="ks-wl-empty-title">Your wishlist is empty</h1>
              <p className="ks-wl-empty-sub">
                Save items you love and they&apos;ll appear here for easy access.
              </p>
              <Link href="/products" className="ks-wl-empty-btn">
                <ShoppingBag className="w-[18px] h-[18px]" />
                Browse Products
              </Link>
            </div>
          </section>
        </div>
      </>
    );
  }

  return (
    <>
      <Breadcrumb items={[{ label: "Wishlist" }]} />

      <div className="flex flex-col gap-5 sm:gap-6 pt-4 sm:pt-5 pb-20 sm:pb-28">
        <section className="site-container">
          <div className="bg-white rounded-2xl overflow-hidden">
            <div className="h-[3px] bg-gradient-to-r from-red-400 via-rose-500 to-pink-400" />
            <div className="p-5 sm:p-6">
              <div className="flex items-start sm:items-center justify-between gap-4 flex-col sm:flex-row">
                <div className="flex items-center gap-3.5">
                  <div className="ks-wl-icon-box">
                    <Heart className="w-[22px] h-[22px] text-red-500 fill-red-500" />
                  </div>
                  <div>
                    <h1 className="text-2xl sm:text-[28px] font-extrabold text-[#111] tracking-tight leading-tight">
                      My Wishlist
                    </h1>
                    <p className="text-sm text-[#999] font-medium mt-1.5">
                      {items.length} {items.length === 1 ? "item" : "items"} saved &middot; {inStockCount} in stock
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  <button className="ks-wl-share-btn">
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                  <button onClick={addAllToCart} className="ks-wl-addall-btn">
                    <ShoppingCart className="w-4 h-4" />
                    Add All to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="site-container">
          <div className="bg-white rounded-2xl p-5 sm:p-6">
            <div className="ks-wl-grid">
              {items.map((item) => {
                const discount =
                  item.sellingPrice > item.unitPrice
                    ? Math.round(((item.sellingPrice - item.unitPrice) / item.sellingPrice) * 100)
                    : 0;

                return (
                  <div key={item.productId} className="ks-wl-card group">
                    <div className="ks-wl-card-img-area">
                      <Link href={`/product/${item.slug}`}>
                        <ProductImage
                          src={item.image || PLACEHOLDER}
                          alt={item.name}
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </Link>

                      {!item.inStock && (
                        <div className="ks-wl-oos-overlay">
                          <span className="ks-wl-oos-badge">Out of Stock</span>
                        </div>
                      )}

                      {discount > 0 && (
                        <span className="ks-wl-discount-badge">-{discount}%</span>
                      )}

                      <button
                        onClick={() => removeItem(item.productId)}
                        className="ks-wl-remove-btn"
                        aria-label="Remove from wishlist"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="ks-wl-card-body">
                      {item.vendor && (
                        <Link
                          href={`/vendor/${item.vendor._id}`}
                          className="ks-wl-vendor"
                        >
                          {item.vendor.name}
                        </Link>
                      )}

                      <Link href={`/product/${item.slug}`}>
                        <h3 className="ks-wl-card-name">{item.name}</h3>
                      </Link>

                      <div className="ks-wl-price-row">
                        <span className="ks-wl-price">{formatPrice(item.unitPrice)}</span>
                        {item.sellingPrice > item.unitPrice && (
                          <span className="ks-wl-price-old">
                            {formatPrice(item.sellingPrice)}
                          </span>
                        )}
                      </div>

                      <p className="ks-wl-added-date">
                        Added{" "}
                        {new Date(item.addedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>

                      <button
                        onClick={() => addToCart(item.productId)}
                        disabled={!item.inStock}
                        className={`ks-wl-cart-btn ${!item.inStock ? "ks-wl-cart-btn-disabled" : ""}`}
                      >
                        <ShoppingCart className="w-4 h-4" />
                        {item.inStock ? "Add to Cart" : "Out of Stock"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="ks-wl-continue">
              <Link href="/products" className="ks-wl-continue-link">
                <Package className="w-4 h-4" />
                Continue Shopping
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
