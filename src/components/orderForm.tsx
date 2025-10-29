"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const orderSchema = z.object({
  customerName: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name too long"),
  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .max(255, "Email too long"),
  phone: z
    .string()
    .trim()
    .min(10, "Phone number must be at least 10 digits")
    .max(20, "Phone number too long"),
  address: z
    .string()
    .trim()
    .min(5, "Address must be at least 5 characters")
    .max(500, "Address too long"),
  city: z
    .string()
    .trim()
    .min(2, "City required")
    .max(100, "City name too long"),
  state: z
    .string()
    .trim()
    .min(2, "State required")
    .max(50, "State name too long"),
  zip: z
    .string()
    .trim()
    .min(3, "ZIP code required")
    .max(20, "ZIP code too long"),
});

type OrderFormData = z.infer<typeof orderSchema>;

interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
}

const products: Product[] = [
  { id: "1", name: "Fresh Tilapia", price: 8.99, unit: "per kg" },
  { id: "2", name: "Smoked Tilapia", price: 10.49, unit: "per kg" },
  { id: "3", name: "Live Tilapia", price: 9.99, unit: "per kg" },
  { id: "4", name: "Fresh Catfish", price: 7.99, unit: "per kg" },
  { id: "5", name: "Smoked Catfish", price: 9.49, unit: "per kg" },
  { id: "6", name: "Live Catfish", price: 8.99, unit: "per kg" },
];

export default function OrderForm() {
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
  });

  const updateQuantity = (productId: string, delta: number) => {
    setQuantities((prev) => {
      const current = prev[productId] || 0;
      const newQuantity = Math.max(0, current + delta);
      if (newQuantity === 0) {
        const { [productId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [productId]: newQuantity };
    });
  };

  const calculateTotal = () => {
    return products.reduce((total, product) => {
      const quantity = quantities[product.id] || 0;
      return total + product.price * quantity;
    }, 0);
  };

  const hasItems = Object.values(quantities).some((qty) => qty > 0);

  const onSubmit = async (data: OrderFormData) => {
    if (!hasItems) {
      toast({
        title: "No items selected",
        description: "Please add at least one item to your order.",
        variant: "destructive",
      });
      return;
    }

    const orderItems = products
      .filter((product) => quantities[product.id] > 0)
      .map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: quantities[product.id],
      }));

    const orderDetails = orderItems
      .map((item) => `${item.name} x${item.quantity}`)
      .join(", ");

    const totalAmount = calculateTotal();
    const deliveryAddress = `${data.address}, ${data.city}, ${data.state} ${data.zip}`;

    try {
      // Save order to database
      //   const { error: orderError } = await supabase.from("orders").insert({
      //     customer_name: data.customerName,
      //     customer_email: data.email,
      //     customer_phone: data.phone,
      //     delivery_address: deliveryAddress,
      //     items: orderItems,
      //     total_amount: totalAmount,
      //     status: "pending",
      //   });

      //   if (orderError) throw orderError;

      //   const message = encodeURIComponent(
      //     `New Order:\n\nCustomer: ${data.customerName}\nEmail: ${
      //       data.email
      //     }\nPhone: ${
      //       data.phone
      //     }\n\nDelivery Address:\n${deliveryAddress}\n\nItems:\n${orderDetails}\n\nTotal: $${totalAmount.toFixed(
      //       2
      //     )}`
      //   );

      //   // Open WhatsApp with pre-filled message
      //   window.open(`https://wa.me/?text=${message}`, "_blank");

      //   toast({
      //     title: "Order placed successfully!",
      //     description:
      //       "Your order has been received and prepared for WhatsApp confirmation.",
      //   });

      reset();
      setQuantities({});
    } catch (error) {
      console.error("Error placing order:", error);
      toast({
        title: "Error",
        description: "Failed to place order. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Products Section */}
      <Card className="border">
        <CardHeader>
          <CardTitle className="text-2xl">Select Products</CardTitle>
          <CardDescription>
            Choose items and quantities for your order
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between p-4 rounded-lg border border-gray-200 bg-card hover:bg-muted/50 transition-colors"
            >
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{product.name}</h3>
                <p className="text-sm text-muted-foreground">
                  GHS{product.price.toFixed(2)} {product.unit}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  onClick={() => updateQuantity(product.id, -1)}
                  disabled={!quantities[product.id]}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center font-semibold text-black">
                  {quantities[product.id] || 0}
                </span>
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  onClick={() => updateQuantity(product.id, 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Customer Information */}
      <Card className="border border-gray-200">
        <CardHeader>
          <CardTitle className="text-2xl">Customer Information</CardTitle>
          <CardDescription>
            We'll use this to process your order
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="customerName">Full Name *</Label>
              <Input
                id="customerName"
                placeholder="John Doe"
                {...register("customerName")}
                className={errors.customerName ? "border-destructive" : ""}
              />
              {errors.customerName && (
                <p className="text-sm text-destructive">
                  {errors.customerName.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                {...register("email")}
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && (
                <p className="text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              placeholder="+1 (555) 123-4567"
              {...register("phone")}
              className={errors.phone ? "border-destructive" : ""}
            />
            {errors.phone && (
              <p className="text-sm text-destructive">{errors.phone.message}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Delivery Address */}
      <Card className="border border-gray-200">
        <CardHeader>
          <CardTitle className="text-2xl">Delivery Address</CardTitle>
          <CardDescription>Where should we deliver your order?</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="address">Street Address *</Label>
            <Input
              id="address"
              placeholder="123 Main Street"
              {...register("address")}
              className={errors.address ? "border-destructive" : ""}
            />
            {errors.address && (
              <p className="text-sm text-destructive">
                {errors.address.message}
              </p>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                placeholder="New York"
                {...register("city")}
                className={errors.city ? "border-destructive" : ""}
              />
              {errors.city && (
                <p className="text-sm text-destructive">
                  {errors.city.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State *</Label>
              <Input
                id="state"
                placeholder="NY"
                {...register("state")}
                className={errors.state ? "border-destructive" : ""}
              />
              {errors.state && (
                <p className="text-sm text-destructive">
                  {errors.state.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="zip">ZIP Code *</Label>
              <Input
                id="zip"
                placeholder="10001"
                {...register("zip")}
                className={errors.zip ? "border-destructive" : ""}
              />
              {errors.zip && (
                <p className="text-sm text-destructive">{errors.zip.message}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Order Summary */}
      {hasItems && (
        <Card className="border border-gray-200">
          <CardHeader>
            <CardTitle className="text-2xl">Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {products
                .filter((product) => quantities[product.id] > 0)
                .map((product) => (
                  <div
                    key={product.id}
                    className="flex justify-between text-sm"
                  >
                    <span className="text-muted-foreground">
                      {product.name} x{quantities[product.id]}
                    </span>
                    <span className="font-semibold text-gray-800">
                      GHS{(product.price * quantities[product.id]).toFixed(2)}
                    </span>
                  </div>
                ))}
              <div className="border-t border-gray-200 pt-2 mt-2">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-primary">
                    GHS{calculateTotal().toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        size="lg"
        className="w-full text-white bg-orange-500 hover:bg-orange-600"
        disabled={!hasItems}
      >
        <ShoppingCart className="mr-2 h-5 w-5" />
        Complete Order via WhatsApp
      </Button>
    </form>
  );
}
