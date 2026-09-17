import { DashboardLayout, PublicLayout } from "@/layouts";
import {
  AddProductsPage,
  AiPage,
  CampaignPage,
  CreateOrderPage,
  CustomerOverviewPage,
  CustomerPage,
  EditOrderPage,
  EditProductsPage,
  // ListingModerationPage,
  OrderPage,
  // PlatformOverviewPage,
  AdminOverviewPage,
  ProductsPage,
  SellerAprovalsPage,
  SellerOverviewPage,
  ListingModerationPage,
  AdminSettingsPage,
  AdminOrdersPage,
  ListingsPage,
  MessagesPage,
  PromotionsPage,
  ReviewsPage,
  SellerSettingsPage,
  AdminRolesPage,
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
import { isAdminRole, isVendorRole, isCustomerRole } from "@/lib/roles";
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
import RequireAuth from "@/Utils/RequireAuth";
import NotFoundPage from "@/pages/public/NotFoundPage";
import ForgotPasswordPage from "@/pages/public/Auth/ForgotPassword";
import AdminPermissionsPage from "@/pages/dashboard/AdminDashboard/AdminPermissions";
import AdminsPage from "@/pages/dashboard/AdminDashboard/Admin";
import CategoriesPage from "@/pages/dashboard/AdminDashboard/CategoriesPage";
import SubcategoriesPage from "@/pages/dashboard/AdminDashboard/SubCategoriesPage";
import ChildCategoriesPage from "@/pages/dashboard/AdminDashboard/ChildCategories";
import VerifyEmailPage from "@/pages/public/Auth/VerifyEmail";
import AdminRequestPage from "@/pages/dashboard/AdminDashboard/AdminRequest";
import DashboardServicePage from "@/pages/dashboard/SellerDashboard/ServicePage";
import CurrenciesPage from "@/pages/dashboard/AdminDashboard/CurrencyPage";

export default function Routes() {
  // Reactive subscription — NOT .getState(). A snapshot read here means this
  // component never re-renders when setAuth() runs during login, so the
  // route tree stays built for "logged out" even after navigate() fires,
  // causing a 404 flash until a manual refresh forces a fresh render.
  // @ts-ignore
  const permission = useAuthStore((s) => s.permission);

  // isAdminRole/isVendorRole/isCustomerRole group the tiered roles
  // (super_admin + admin, vendor + vendor_admin) so both get the same
  // dashboard route tree. Finer-grained access within that tree is handled
  // separately via Admin Permissions, not here.
  const isAdmin = isAdminRole(permission);
  const isVendor = isVendorRole(permission);
  const isCustomer = isCustomerRole(permission);

  return (
    <BaseRoutes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/categories" element={<CategoryListingPage />} />
        <Route path="/category/:categoryId" element={<CategoryListingPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
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
      <Route path="/verify-email" element={<VerifyEmailPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/admin/invitations/accept" element={<AdminRequestPage />} />
      {/* <Route path="/password/reset" element={<ResetPasswordPage />} /> */}
      {/* </Route> */}

      {/* Pathless guard — wraps every dashboard route without claiming a URL
          of its own. Redirects to /login if not authenticated; otherwise
          renders DashboardLayout + whichever role-specific routes match. */}
      <Route element={<RequireAuth />}>
        <Route element={<DashboardLayout />}>
          {/* <Route path="/design/system" element={<DesignSystemPage />} /> */}

          {isVendor && (
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
                element={<DashboardServicePage />}
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
              <Route
                path="/dashboard/admin/seller-approvals"
                element={<SellerAprovalsPage />}
              />
              <Route
                path="/dashboard/admin/admin-roles"
                element={<AdminRolesPage />}
              />
               <Route
                path="/dashboard/admin/currency"
                element={<CurrenciesPage />}
              />
              <Route path="/dashboard/admin/sub_categories" element={<SubcategoriesPage />} />
              <Route path="/dashboard/admin/child_categories" element={<ChildCategoriesPage />} />
              <Route
                path="/dashboard/admin/admin-permissions"
                element={<AdminPermissionsPage />}
              />
              <Route path="/dashboard/admin/admins" element={<AdminsPage />} />
              <Route path="/dashboard/admin/admins/:adminId/permissions" element={<AdminPermissionsPage />} />
              <Route
                path="/dashboard/admin/listing-moderation"
                element={<ListingModerationPage />}
              />
              <Route
                path="/dashboard/admin/categories"
                element={<CategoriesPage />}
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
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </BaseRoutes>
  );
}