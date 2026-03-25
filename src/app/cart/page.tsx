"use client";

import { useState } from "react";
import Link from "next/link";
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, Tag } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import ProductImage from "@/components/ui/ProductImage";

// Mock cart data
const initialCartItems = [
  {
    _id: "1",
    product: {
      _id: "p1",
      name: "Apple MacBook Pro 14-inch M3 Pro",
      slug: "macbook-pro-14-m3",
      image: "/products/macbook.jpg",
      sellingPrice: 1999.99,
      discountPrice: 1849.99,
      vendor: { name: "TechZone", slug: "techzone" },
    },
    quantity: 1,
    variant: { Storage: "512GB", Color: "Space Gray" },
  },
  {
    _id: "2",
    product: {
      _id: "p2",
      name: "Sony WH-1000XM5 Wireless Headphones",
      slug: "sony-wh-1000xm5",
      image: "/products/sony-headphones.jpg",
      sellingPrice: 399.99,
      discountPrice: 349.99,
      vendor: { name: "AudioMax", slug: "audiomax" },
    },
    quantity: 2,
    variant: { Color: "Black" },
  },
  {
    _id: "3",
    product: {
      _id: "p3",
      name: "USB-C Hub Adapter 7-in-1",
      slug: "usb-c-hub-adapter",
      image: "/products/hub.jpg",
      sellingPrice: 49.99,
      discountPrice: 39.99,
      vendor: { name: "TechZone", slug: "techzone" },
    },
    quantity: 1,
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems((items) =>
      items.map((item) =>
        item._id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item._id !== id));
  };

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === "SAVE10") {
      setAppliedCoupon("SAVE10");
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) =>
      sum +
      (item.product.discountPrice || item.product.sellingPrice) * item.quantity,
    0
  );
  const discount = appliedCoupon ? subtotal * 0.1 : 0;
  const shipping = subtotal > 50 ? 0 : 9.99;
  const total = subtotal - discount + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="site-container py-16">
          <div className="max-w-md mx-auto text-center">
            <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Your cart is empty
            </h1>
            <p className="text-gray-500 mb-8">
              Looks like you haven&apos;t added any items to your cart yet.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
            >
              Start Shopping
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="site-container py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-orange-500">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">Shopping Cart</span>
        </nav>

        <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {/* Header */}
              <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-600">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>

              {/* Items */}
              <div className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <div key={item._id} className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                      {/* Product Info */}
                      <div className="md:col-span-6 flex gap-4">
                        <div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          <ProductImage
                            src={item.product.image}
                            alt={item.product.name}
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <Link
                            href={`/product/${item.product.slug}`}
                            className="font-medium text-gray-800 hover:text-orange-500 line-clamp-2"
                          >
                            {item.product.name}
                          </Link>
                          <p className="text-sm text-gray-500 mt-1">
                            Sold by:{" "}
                            <Link
                              href={`/vendor/${item.product.vendor.slug}`}
                              className="text-orange-500 hover:underline"
                            >
                              {item.product.vendor.name}
                            </Link>
                          </p>
                          {item.variant && (
                            <p className="text-sm text-gray-500">
                              {Object.entries(item.variant)
                                .map(([key, value]) => `${key}: ${value}`)
                                .join(", ")}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Price */}
                      <div className="md:col-span-2 flex md:justify-center items-center gap-2">
                        <span className="md:hidden text-sm text-gray-500">
                          Price:
                        </span>
                        <div>
                          <span className="font-medium">
                            {formatPrice(
                              item.product.discountPrice ||
                                item.product.sellingPrice
                            )}
                          </span>
                          {item.product.discountPrice && (
                            <span className="text-sm text-gray-400 line-through ml-2">
                              {formatPrice(item.product.sellingPrice)}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Quantity */}
                      <div className="md:col-span-2 flex md:justify-center items-center gap-2">
                        <span className="md:hidden text-sm text-gray-500">
                          Qty:
                        </span>
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            onClick={() =>
                              updateQuantity(item._id, item.quantity - 1)
                            }
                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-10 text-center font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item._id, item.quantity + 1)
                            }
                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Total */}
                      <div className="md:col-span-2 flex justify-between md:justify-end items-center gap-4">
                        <span className="md:hidden text-sm text-gray-500">
                          Total:
                        </span>
                        <span className="font-semibold text-orange-500">
                          {formatPrice(
                            (item.product.discountPrice ||
                              item.product.sellingPrice) * item.quantity
                          )}
                        </span>
                        <button
                          onClick={() => removeItem(item._id)}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Continue Shopping */}
            <div className="mt-4 flex justify-between items-center">
              <Link
                href="/products"
                className="text-orange-500 hover:underline font-medium"
              >
                ← Continue Shopping
              </Link>
              <button
                onClick={() => setCartItems([])}
                className="text-gray-500 hover:text-red-500"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                Order Summary
              </h2>

              {/* Coupon Code */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Coupon Code
                </label>
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter code"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <button
                    onClick={applyCoupon}
                    className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
                  >
                    Apply
                  </button>
                </div>
                {appliedCoupon && (
                  <p className="mt-2 text-sm text-green-600">
                    Coupon &quot;{appliedCoupon}&quot; applied! 10% off
                  </p>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  Try &quot;SAVE10&quot; for 10% off
                </p>
              </div>

              {/* Summary Details */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Subtotal ({cartItems.length} items)
                  </span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? "Free" : formatPrice(shipping)}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-gray-500">
                    Free shipping on orders over $50
                  </p>
                )}
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-orange-500">{formatPrice(total)}</span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <Link
                href="/checkout"
                className="w-full mt-6 bg-orange-500 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-orange-600 transition-colors"
              >
                Proceed to Checkout
                <ArrowRight className="w-5 h-5" />
              </Link>

              {/* Security Note */}
              <p className="mt-4 text-xs text-gray-500 text-center">
                🔒 Secure checkout powered by Stripe
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
