"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CreditCard,
  MapPin,
  Truck,
  Shield,
  ChevronRight,
  CheckCircle,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";

// Mock data
const cartItems = [
  {
    _id: "1",
    name: "Apple MacBook Pro 14-inch M3 Pro",
    image: "/products/macbook.jpg",
    price: 1849.99,
    quantity: 1,
    variant: "512GB / Space Gray",
  },
  {
    _id: "2",
    name: "Sony WH-1000XM5 Wireless Headphones",
    image: "/products/sony-headphones.jpg",
    price: 349.99,
    quantity: 1,
    variant: "Black",
  },
];

const paymentMethods = [
  { id: "card", name: "Credit/Debit Card", icon: CreditCard },
  { id: "paypal", name: "PayPal", icon: Shield },
];

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
  });
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardInfo, setCardInfo] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardInfo((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="site-container py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-orange-500">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/cart" className="hover:text-orange-500">Cart</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">Checkout</span>
        </nav>

        {/* Steps Indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 1 ? "bg-orange-500 text-white" : "bg-gray-200"}`}>
              {step > 1 ? <CheckCircle className="w-5 h-5" /> : "1"}
            </div>
            <span className={`ml-2 font-medium ${step >= 1 ? "text-orange-500" : "text-gray-500"}`}>Shipping</span>
          </div>
          <div className={`w-20 h-1 mx-4 ${step >= 2 ? "bg-orange-500" : "bg-gray-200"}`} />
          <div className="flex items-center">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 2 ? "bg-orange-500 text-white" : "bg-gray-200"}`}>
              {step > 2 ? <CheckCircle className="w-5 h-5" /> : "2"}
            </div>
            <span className={`ml-2 font-medium ${step >= 2 ? "text-orange-500" : "text-gray-500"}`}>Payment</span>
          </div>
          <div className={`w-20 h-1 mx-4 ${step >= 3 ? "bg-orange-500" : "bg-gray-200"}`} />
          <div className="flex items-center">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 3 ? "bg-orange-500 text-white" : "bg-gray-200"}`}>
              3
            </div>
            <span className={`ml-2 font-medium ${step >= 3 ? "text-orange-500" : "text-gray-500"}`}>Review</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Shipping */}
            {step === 1 && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-orange-500" />
                  Shipping Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={shippingInfo.firstName}
                      onChange={handleShippingChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={shippingInfo.lastName}
                      onChange={handleShippingChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={shippingInfo.email}
                      onChange={handleShippingChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={shippingInfo.phone}
                      onChange={handleShippingChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                    <input
                      type="text"
                      name="address"
                      value={shippingInfo.address}
                      onChange={handleShippingChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <input
                      type="text"
                      name="city"
                      value={shippingInfo.city}
                      onChange={handleShippingChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                    <input
                      type="text"
                      name="state"
                      value={shippingInfo.state}
                      onChange={handleShippingChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={shippingInfo.zipCode}
                      onChange={handleShippingChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                    <select
                      name="country"
                      value={shippingInfo.country}
                      onChange={handleShippingChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                    >
                      <option>United States</option>
                      <option>Canada</option>
                      <option>United Kingdom</option>
                    </select>
                  </div>
                </div>

                {/* Shipping Method */}
                <div className="mt-8">
                  <h3 className="font-medium mb-4 flex items-center gap-2">
                    <Truck className="w-5 h-5 text-orange-500" />
                    Shipping Method
                  </h3>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between p-4 border border-orange-500 bg-orange-50 rounded-lg cursor-pointer">
                      <div className="flex items-center gap-3">
                        <input type="radio" name="shipping" defaultChecked className="text-orange-500" />
                        <div>
                          <p className="font-medium">Free Shipping</p>
                          <p className="text-sm text-gray-500">5-7 business days</p>
                        </div>
                      </div>
                      <span className="font-medium text-green-600">Free</span>
                    </label>
                    <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-gray-300">
                      <div className="flex items-center gap-3">
                        <input type="radio" name="shipping" className="text-orange-500" />
                        <div>
                          <p className="font-medium">Express Shipping</p>
                          <p className="text-sm text-gray-500">2-3 business days</p>
                        </div>
                      </div>
                      <span className="font-medium">$14.99</span>
                    </label>
                  </div>
                </div>

                <button
                  onClick={() => setStep(2)}
                  className="w-full mt-8 bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
                >
                  Continue to Payment
                </button>
              </div>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-orange-500" />
                  Payment Method
                </h2>

                {/* Payment Methods */}
                <div className="space-y-3 mb-6">
                  {paymentMethods.map((method) => {
                    const Icon = method.icon;
                    return (
                      <label
                        key={method.id}
                        className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer ${
                          paymentMethod === method.id
                            ? "border-orange-500 bg-orange-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value={method.id}
                          checked={paymentMethod === method.id}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="text-orange-500"
                        />
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{method.name}</span>
                      </label>
                    );
                  })}
                </div>

                {/* Card Details */}
                {paymentMethod === "card" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                      <input
                        type="text"
                        name="number"
                        value={cardInfo.number}
                        onChange={handleCardChange}
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
                      <input
                        type="text"
                        name="name"
                        value={cardInfo.name}
                        onChange={handleCardChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                        <input
                          type="text"
                          name="expiry"
                          value={cardInfo.expiry}
                          onChange={handleCardChange}
                          placeholder="MM/YY"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                        <input
                          type="text"
                          name="cvv"
                          value={cardInfo.cvv}
                          onChange={handleCardChange}
                          placeholder="123"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-4 mt-8">
                  <button
                    onClick={() => setStep(1)}
                    className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="flex-1 bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
                  >
                    Review Order
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Review */}
            {step === 3 && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold mb-6">Review Your Order</h2>

                {/* Shipping Address */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium mb-2">Shipping Address</h3>
                      <p className="text-gray-600">
                        {shippingInfo.firstName} {shippingInfo.lastName}<br />
                        {shippingInfo.address}<br />
                        {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}<br />
                        {shippingInfo.country}
                      </p>
                    </div>
                    <button onClick={() => setStep(1)} className="text-orange-500 text-sm hover:underline">
                      Edit
                    </button>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium mb-2">Payment Method</h3>
                      <p className="text-gray-600">
                        {paymentMethod === "card" ? `Card ending in ${cardInfo.number.slice(-4) || "****"}` : "PayPal"}
                      </p>
                    </div>
                    <button onClick={() => setStep(2)} className="text-orange-500 text-sm hover:underline">
                      Edit
                    </button>
                  </div>
                </div>

                {/* Order Items */}
                <div className="mb-6">
                  <h3 className="font-medium mb-4">Order Items</h3>
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item._id} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="relative w-20 h-20 bg-gray-200 rounded-lg overflow-hidden">
                          <Image src={item.image || "/placeholder-product.jpg"} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-gray-500">{item.variant}</p>
                          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-semibold">{formatPrice(item.price)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setStep(2)}
                    className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50"
                  >
                    Back
                  </button>
                  <button className="flex-1 bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
                    Place Order - {formatPrice(total)}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>

              {/* Items */}
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item._id} className="flex gap-3">
                    <div className="relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                      <Image src={item.image || "/placeholder-product.jpg"} alt={item.name} fill className="object-cover" />
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-gray-500 text-white text-xs rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium line-clamp-2">{item.name}</p>
                      <p className="text-sm text-gray-500">{item.variant}</p>
                    </div>
                    <p className="font-medium">{formatPrice(item.price)}</p>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-3 text-sm border-t border-gray-200 pt-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-3">
                  <span>Total</span>
                  <span className="text-orange-500">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Security */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span>Your payment info is secure</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
