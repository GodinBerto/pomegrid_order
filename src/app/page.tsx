import Footer from "@/components/footer";
import HeroSection from "@/components/hero";
import Navbar from "@/components/navbar";
import OrderForm from "@/components/orderForm";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center px-4 md:px-8 py-10 md:h-[calc(100vh-150px)] h-[calc(100vh-100px)]">
        <HeroSection />
      </div>
      {/* Order Form Section */}
      <section className="container mx-auto px-4 py-16">
        <div className=" mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Place Your Order
            </h2>
            <p className="text-lg text-muted-foreground">
              Select your favorite products and we'll prepare your order for
              delivery
            </p>
          </div>
          <OrderForm />
        </div>
      </section>
      <Footer />
    </div>
  );
}
