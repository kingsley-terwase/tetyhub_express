import { DashboardLayout, PublicLayout, SettingsLayout } from "@/layouts";
import { ResetPasswordPage } from "@/pages/auth";
import {
  AddProductsPage,
  AiPage,
  CampaignPage,
  CreateOrderPage,
  CustomerOverviewPage,
  CustomerPage,
  DesignSystemPage,
  EditOrderPage,
  EditProductsPage,
  // ListingModerationPage,
  OrderPage,
  // PlatformOverviewPage,
  AdminOverviewPage,
  ProductsPage,
  SellerAprovalsPage,
  SellerOverviewPage,
  ServicePage,
} from "@/pages/dashboard";
import OrderDetail from "@/pages/dashboard/SellerDashboard/OrderPage/OrderDetail";
import {
  AboutPage,
  CartPage,
  CategoryListingPage,
  CheckoutPage,
  ContactPage,
  FAQPage,
  HomePage,
  HowItWorksPage,
  LoginPage,
  OrderConfirmedPage,
  PoliciesPage,
  RegisterPage,
  ReportIssuePage,
  ReviewPage,
  SellPage,
  ServiceDetailPage,
  ServicesPage,
  StorePage,
  SupportChatPage,
  TrackOrderPage,
} from "@/pages/public";
import { CompanyAccountPage, VendorAccountPage } from "@/pages/settings";
import { useAuthStore } from "@/store/auth";
import { ROLES, SUBROLES } from "@/lib/roles";
import { Routes as BaseRoutes, Route } from "react-router-dom";
import ProductDetailPage from "@/pages/public/CategoryListingPage/ProductDetails";

export default function Routes() {
  const { permission } = useAuthStore.getState();
  const ROLE = permission?.role_id;
  const SUB_ROLE = permission?.subrole_id;

  const isAdmin = ROLE == ROLES.ADMIN;
  const isPlatformAdmin = isAdmin && SUB_ROLE == SUBROLES.PLATFORM_ADMIN;
  const isSeller = ROLE == ROLES.SELLER;
  const isCustomer = ROLE == ROLES.CUSTOMER;

  return (
    <BaseRoutes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/categories" element={<CategoryListingPage />} />
        <Route path="/category/:categoryId" element={<CategoryListingPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/sell" element={<SellPage />} />
        <Route path="/store" element={<StorePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/service/:id" element={<ServiceDetailPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-confirmed" element={<OrderConfirmedPage />} />
        <Route path="/track-order" element={<TrackOrderPage />} />
        <Route path="/review" element={<ReviewPage />} />
        <Route path="/support/report" element={<ReportIssuePage />} />
        <Route path="/support/chat" element={<SupportChatPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/policies" element={<PoliciesPage />} />
      </Route>
      {/*  */}
      {/* <Route element={<AuthLayout />}> */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/password/reset" element={<ResetPasswordPage />} />
      {/* </Route> */}

      <Route element={<DashboardLayout />}>
        <Route path="/design/system" element={<DesignSystemPage />} />

        {isSeller && (
          <>
            <Route path="/dashboard/seller" element={<SellerOverviewPage />} />
            <Route
              path="/dashboard/seller/products"
              element={<ProductsPage />}
            />
            <Route
              path="/dashboard/seller/products/add"
              element={<AddProductsPage />}
            />
            <Route
              path="/dashboard/seller/products/:id/edit"
              element={<EditProductsPage />}
            />
            <Route
              path="/dashboard/seller/campaign"
              element={<CampaignPage />}
            />
            <Route
              path="/dashboard/seller/services"
              element={<ServicePage />}
            />
            <Route path="/dashboard/seller/ai" element={<AiPage />} />
            <Route path="/dashboard/seller/orders" element={<OrderPage />} />
            <Route
              path="/dashboard/seller/orders/:id"
              element={<OrderDetail />}
            />
            <Route
              path="/dashboard/seller/create-order"
              element={<CreateOrderPage />}
            />
            <Route
              path="/dashboard/seller/edit-order"
              element={<EditOrderPage />}
            />
            <Route
              path="/dashboard/seller/customers"
              element={<CustomerPage />}
            />
          </>
        )}

        {isCustomer && (
          <>
            <Route
              path="/dashboard/customer"
              element={<CustomerOverviewPage />}
            />
            <Route path="/dashboard/customer/orders" element={<OrderPage />} />
            <Route
              path="/dashboard/customer/orders/:id"
              element={<OrderDetail />}
            />
          </>
        )}

        {isAdmin && (
          <>
            <Route path="/dashboard/admin" element={<AdminOverviewPage />} />
            <Route path="/dashboard/admin/orders" element={<OrderPage />} />
            <Route
              path="/dashboard/admin/orders/:id"
              element={<OrderDetail />}
            />
            {isPlatformAdmin && (
              <>
                <Route
                  path="/dashboard/admin/seller-approvals"
                  element={<SellerAprovalsPage />}
                />
                {/* <Route
                    path="/dashboard/admin/listing-moderation"
                    element={<ListingModerationPage />}
                /> 
            */}
              </>
            )}
          </>
        )}
      </Route>

      <Route element={<SettingsLayout />}>
        <Route path="/settings/account" element={<VendorAccountPage />} />
        <Route
          path="/settings/company/general"
          element={<CompanyAccountPage />}
        />
      </Route>
    </BaseRoutes>
  );
}
