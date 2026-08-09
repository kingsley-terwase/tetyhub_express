import { DashboardLayout, PublicLayout } from "@/layouts";
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
  ListingModerationPage,
  AdminSettingsPage,
  AdminOrdersPage,
  ListingsPage,
  MessagesPage,
  PromotionsPage,
  ReviewsPage,
  SellerSettingsPage,
} from "@/pages/dashboard";
import OrderDetail from "@/pages/dashboard/SellerDashboard/OrderPage/OrderDetail";
import {
  AboutPage,
  AccountPage,
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
// import { CompanyAccountPage, VendorAccountPage } from "@/pages/settings";
import { useAuthStore } from "@/store/auth";
import { ROLES, SUBROLES } from "@/lib/roles";
import { Routes as BaseRoutes, Route } from "react-router-dom";
import ProductDetailPage from "@/pages/public/CategoryListingPage/ProductDetails";
import SellersDirectory from "@/pages/dashboard/AdminDashboard/SellersDirectory";
import BuyersDirectoryPage from "@/pages/dashboard/AdminDashboard/BuyersDirectoryPage";
import DisputesResolutionPage from "@/pages/dashboard/AdminDashboard/DisputesResolutionPage";
import PaymentsPayoutsPage from "@/pages/dashboard/AdminDashboard/PaymentsPayoutsPage";
import PromotionsCouponsPage from "@/pages/dashboard/AdminDashboard/PromotionsCouponsPage";
import ReviewsModerationPage from "@/pages/dashboard/AdminDashboard/ReviewsModerationPage";
import KYCVerificationPage from "@/pages/dashboard/AdminDashboard/KYCVerificationPage";
import AdminActivityLogPage from "@/pages/dashboard/AdminDashboard/AdminActivityLogPage";
import AnalyticsReportsPage from "@/pages/dashboard/AdminDashboard/AnalyticsReportsPage";
import ContentManagementPage from "@/pages/dashboard/AdminDashboard/ContentManagementPage";
import AnnouncementsPage from "@/pages/dashboard/AdminDashboard/AnnouncementsPage";
import SupportTicketsPage from "@/pages/dashboard/AdminDashboard/SupportTicketsPage";

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
        <Route path="/account" element={<AccountPage />} />
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
            <Route
              path="/dashboard/seller/listings"
              element={<ListingsPage />}
            />
            <Route
              path="/dashboard/seller/messages"
              element={<MessagesPage />}
            />
            <Route
              path="/dashboard/seller/promotions"
              element={<PromotionsPage />}
            />
            <Route path="/dashboard/seller/reviews" element={<ReviewsPage />} />
            <Route
              path="/dashboard/seller/seller-settings"
              element={<SellerSettingsPage />}
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
            <Route
              path="/dashboard/admin/orders"
              element={<AdminOrdersPage />}
            />
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
                <Route
                  path="/dashboard/admin/listing-moderation"
                  element={<ListingModerationPage />}
                />
                <Route
                  path="/dashboard/admin/seller-directory"
                  element={<SellersDirectory />}
                />
                <Route
                  path="/dashboard/admin/buyer-directory"
                  element={<BuyersDirectoryPage />}
                />
                <Route
                  path="/dashboard/admin/disputes"
                  element={<DisputesResolutionPage />}
                />
                <Route
                  path="/dashboard/admin/payments"
                  element={<PaymentsPayoutsPage />}
                />
                <Route
                  path="/dashboard/admin/promotions"
                  element={<PromotionsCouponsPage />}
                />
                <Route
                  path="/dashboard/admin/kyc"
                  element={<KYCVerificationPage />}
                />
                <Route
                  path="/dashboard/admin/activity-log"
                  element={<AdminActivityLogPage />}
                />
                <Route
                  path="/dashboard/admin/analytics"
                  element={<AnalyticsReportsPage />}
                />
                <Route
                  path="/dashboard/admin/content-management"
                  element={<ContentManagementPage />}
                />
                <Route
                  path="/dashboard/admin/announcements"
                  element={<AnnouncementsPage />}
                />
                <Route
                  path="/dashboard/admin/support-tickets"
                  element={<SupportTicketsPage />}
                />
                <Route
                  path="/dashboard/admin/reviews"
                  element={<ReviewsModerationPage />}
                />

                <Route
                  path="/dashboard/admin/settings"
                  element={<AdminSettingsPage />}
                />
              </>
            )}
          </>
        )}
      </Route>

      {/* <Route element={<SettingsLayout />}>
        <Route path="/settings/account" element={<VendorAccountPage />} />
        <Route
          path="/settings/company/general"
          element={<CompanyAccountPage />}
        />
      </Route> */}
    </BaseRoutes>
  );
}
