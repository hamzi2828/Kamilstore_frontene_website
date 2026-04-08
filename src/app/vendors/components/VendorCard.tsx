import Link from "next/link";
import { MapPin, Mail, Phone, ArrowRight, UserCircle } from "lucide-react";
import type { Vendor } from "../services/vendorsApi";

const COLORS = ["#3B82F6", "#EC4899", "#10B981", "#F59E0B", "#8B5CF6", "#EF4444", "#059669", "#D97706"];
const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function VendorCard({ vendor, index }: { vendor: Vendor; index: number }) {
  const color = COLORS[index % COLORS.length];

  return (
    <Link
      href={`/vendor/${vendor._id}`}
      className="ks-vs-card group"
    >
      {/* Header */}
      <div className="ks-vs-card-header">
        {vendor.logo ? (
          <img
            src={vendor.logo.startsWith("http") ? vendor.logo : `${API}${vendor.logo}`}
            alt={vendor.shopName}
            className="w-12 h-12 rounded-full object-cover border-2"
            style={{ borderColor: `${color}30` }}
          />
        ) : (
          <div
            className="ks-vs-avatar"
            style={{ background: `linear-gradient(135deg, ${color}22, ${color}11)`, borderColor: `${color}30` }}
          >
            <span style={{ color }}>{vendor.shopName.charAt(0)}</span>
          </div>
        )}
        <div className="ks-vs-card-info">
          <div className="ks-vs-name-row">
            <h3 className="ks-vs-card-name">{vendor.shopName}</h3>
          </div>
          {vendor.shopTitle && vendor.shopTitle !== vendor.shopName && (
            <p className="text-[11.5px] text-[#999] leading-tight">{vendor.shopTitle}</p>
          )}
        </div>
      </div>

      {/* Description */}
      {vendor.description && (
        <p className="text-[12.5px] text-[#888] leading-relaxed mt-2 line-clamp-2">{vendor.description}</p>
      )}

      {/* Details */}
      <div className="flex flex-col gap-2 mt-3">
        {vendor.address && (
          <div className="flex items-center gap-2 text-[12.5px] text-[#777]">
            <MapPin className="w-3.5 h-3.5 text-[#bbb] shrink-0" />
            {vendor.address}
          </div>
        )}
        {vendor.owner && (
          <>
            <div className="flex items-center gap-2 text-[12.5px] text-[#777]">
              <UserCircle className="w-3.5 h-3.5 text-[#bbb] shrink-0" />
              {vendor.owner.name}
            </div>
            <div className="flex items-center gap-2 text-[12.5px] text-[#777]">
              <Mail className="w-3.5 h-3.5 text-[#bbb] shrink-0" />
              {vendor.owner.email}
            </div>
            {vendor.owner.phone && (
              <div className="flex items-center gap-2 text-[12.5px] text-[#777]">
                <Phone className="w-3.5 h-3.5 text-[#bbb] shrink-0" />
                {vendor.owner.phone}
              </div>
            )}
          </>
        )}
      </div>

      {/* CTA */}
      <div className="ks-vs-card-cta">
        Visit store
        <ArrowRight className="ks-vs-card-cta-icon" />
      </div>
    </Link>
  );
}
