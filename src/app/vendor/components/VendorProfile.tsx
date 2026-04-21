import {
  ShieldCheck, MapPin, Calendar,
  MessageCircle, Mail, Phone, UserCircle,
} from "lucide-react";
import type { VendorDetail } from "../types";
import { vendorApi } from "../service/vendorApi";

export default function VendorProfile({ vendor }: { vendor: VendorDetail }) {
  const joinDate = new Date(vendor.createdAt).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
  const logoSrc = vendorApi.getLogoUrl(vendor.logo);

  return (
    <div className="ks-vp-profile-card">
      {/* Avatar */}
      <div className="ks-vp-avatar">
        {logoSrc ? (
          <img
            src={logoSrc}
            alt={vendor.shopName}
            style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }}
          />
        ) : (
          <span className="ks-vp-avatar-letter">
            {vendor.shopName.charAt(0)}
          </span>
        )}
      </div>

      <div className="ks-vp-profile-body">
        {/* Top row */}
        <div className="ks-vp-profile-top">
          <div>
            <div className="ks-vp-name-row">
              <h1 className="ks-vp-name">{vendor.shopName}</h1>
              <span className="ks-vp-verified-badge">
                <ShieldCheck className="ks-vp-verified-icon" />
                Verified
              </span>
            </div>
            {vendor.shopTitle && vendor.shopTitle !== vendor.shopName && (
              <p style={{ fontSize: 14, color: "#999", fontWeight: 500, marginTop: 2 }}>
                {vendor.shopTitle}
              </p>
            )}
            {vendor.description && (
              <p className="ks-vp-desc">{vendor.description}</p>
            )}
          </div>

          <div className="ks-vp-actions">
            {vendor.owner?.email && (
              <a href={`mailto:${vendor.owner.email}`} className="ks-vp-contact-btn" style={{ textDecoration: "none" }}>
                <MessageCircle className="ks-vp-contact-icon" />
                Contact Seller
              </a>
            )}
          </div>
        </div>

        {/* Info grid */}
        <div className="ks-vp-stats-grid">
          {vendor.address && (
            <div className="ks-vp-stat-card">
              <MapPin className="ks-vp-stat-icon" style={{ color: "#EF4444" }} />
              <div>
                <span className="ks-vp-stat-value">{vendor.address}</span>
                <span className="ks-vp-stat-label">Location</span>
              </div>
            </div>
          )}
          <div className="ks-vp-stat-card">
            <Calendar className="ks-vp-stat-icon" style={{ color: "#F97316" }} />
            <div>
              <span className="ks-vp-stat-value">{joinDate}</span>
              <span className="ks-vp-stat-label">Member since</span>
            </div>
          </div>
          {vendor.owner && (
            <>
              <div className="ks-vp-stat-card">
                <UserCircle className="ks-vp-stat-icon" style={{ color: "#3B82F6" }} />
                <div>
                  <span className="ks-vp-stat-value">{vendor.owner.name}</span>
                  <span className="ks-vp-stat-label">Owner</span>
                </div>
              </div>
              <div className="ks-vp-stat-card">
                <Mail className="ks-vp-stat-icon" style={{ color: "#8B5CF6" }} />
                <div>
                  <span className="ks-vp-stat-value">{vendor.owner.email}</span>
                  <span className="ks-vp-stat-label">Email</span>
                </div>
              </div>
              {vendor.owner.phone && (
                <div className="ks-vp-stat-card">
                  <Phone className="ks-vp-stat-icon" style={{ color: "#10B981" }} />
                  <div>
                    <span className="ks-vp-stat-value">{vendor.owner.phone}</span>
                    <span className="ks-vp-stat-label">Phone</span>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
