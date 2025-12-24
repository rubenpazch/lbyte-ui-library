import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

// Import all icons
import ArrowDetailsIcon from "./ArrowDetailsIcon";
import BrandingIcon from "./BrandingIcon";
import CalendarIcon from "./CalendarIcon";
import CheckIcon from "./CheckIcon";
import CheckmarkIcon from "./CheckmarkIcon";
import ChevronIcon from "./ChevronIcon";
import CityIcon from "./CityIcon";
import ClockIcon from "./ClockIcon";
import CloseIcon from "./CloseIcon";
import DocumentIcon from "./DocumentIcon";
import DownloadIcon from "./DownloadIcon";
import DragHandleIcon from "./DragHandleIcon";
import EditIcon from "./EditIcon";
import EmailIcon from "./EmailIcon";
import ErrorIcon from "./ErrorIcon";
import EyeIcon from "./EyeIcon";
import FilterIcon from "./FilterIcon";
import HomeIcon from "./HomeIcon";
import InfoIcon from "./InfoIcon";
import LinkIcon from "./LinkIcon";
import LocationIcon from "./LocationIcon";
import ManualIdentifierIcon from "./ManualIdentifierIcon";
import MapIcon from "./MapIcon";
import MinusIcon from "./MinusIcon";
import MoreIcon from "./MoreIcon";
import NotificationIcon from "./NotificationIcon";
import PatientIcon from "./PatientIcon";
import PatientsIcon from "./PatientsIcon";
import PhoneIcon from "./PhoneIcon";
import PlusIcon from "./PlusIcon";
import PrescriptionIcon from "./PrescriptionIcon";
import PrintIcon from "./PrintIcon";
import RefreshIcon from "./RefreshIcon";
import SearchIcon from "./SearchIcon";
import SettingsIcon from "./SettingsIcon";
import SortIcon from "./SortIcon";
import SpinnerIcon from "./SpinnerIcon";
import SystemIdentifierIcon from "./SystemIdentifierIcon";
import TrashIcon from "./TrashIcon";
import UploadIcon from "./UploadIcon";
import UserManagementIcon from "./UserManagementIcon";
import UserSelectIcon from "./UserSelectIcon";
import UsersIcon from "./UsersIcon";
import ZoomInIcon from "./ZoomInIcon";
import ZoomOutIcon from "./ZoomOutIcon";

interface IconItem {
  name: string;
  component: React.ComponentType<any>;
  category?: string;
}

const allIcons: IconItem[] = [
  // Navigation & Actions
  { name: "ArrowDetails", component: ArrowDetailsIcon, category: "Navigation" },
  { name: "Check", component: CheckIcon, category: "Status" },
  { name: "Checkmark", component: CheckmarkIcon, category: "Status" },
  { name: "Chevron", component: ChevronIcon, category: "Navigation" },
  { name: "Close", component: CloseIcon, category: "Actions" },
  { name: "DragHandle", component: DragHandleIcon, category: "Actions" },
  { name: "Edit", component: EditIcon, category: "Actions" },
  { name: "Filter", component: FilterIcon, category: "Actions" },
  { name: "Minus", component: MinusIcon, category: "Actions" },
  { name: "More", component: MoreIcon, category: "Navigation" },
  { name: "Plus", component: PlusIcon, category: "Actions" },
  { name: "Refresh", component: RefreshIcon, category: "Actions" },
  { name: "Search", component: SearchIcon, category: "Actions" },
  { name: "Sort", component: SortIcon, category: "Actions" },
  { name: "Trash", component: TrashIcon, category: "Actions" },
  { name: "ZoomIn", component: ZoomInIcon, category: "Actions" },
  { name: "ZoomOut", component: ZoomOutIcon, category: "Actions" },

  // Status & Feedback
  { name: "Error", component: ErrorIcon, category: "Status" },
  { name: "Info", component: InfoIcon, category: "Status" },
  { name: "Notification", component: NotificationIcon, category: "Status" },
  { name: "Spinner", component: SpinnerIcon, category: "Status" },

  // Files & Documents
  { name: "Document", component: DocumentIcon, category: "Files" },
  { name: "Download", component: DownloadIcon, category: "Files" },
  { name: "Print", component: PrintIcon, category: "Files" },
  { name: "Upload", component: UploadIcon, category: "Files" },

  // Communication
  { name: "Email", component: EmailIcon, category: "Communication" },
  { name: "Phone", component: PhoneIcon, category: "Communication" },

  // Places & Location
  { name: "Branding", component: BrandingIcon, category: "Business" },
  { name: "City", component: CityIcon, category: "Places" },
  { name: "Home", component: HomeIcon, category: "Places" },
  { name: "Link", component: LinkIcon, category: "Communication" },
  { name: "Location", component: LocationIcon, category: "Places" },
  { name: "Map", component: MapIcon, category: "Places" },

  // Time & Calendar
  { name: "Calendar", component: CalendarIcon, category: "Time" },
  { name: "Clock", component: ClockIcon, category: "Time" },

  // Users & People
  { name: "Patient", component: PatientIcon, category: "Users" },
  { name: "Patients", component: PatientsIcon, category: "Users" },
  { name: "UserManagement", component: UserManagementIcon, category: "Users" },
  { name: "UserSelect", component: UserSelectIcon, category: "Users" },
  { name: "Users", component: UsersIcon, category: "Users" },

  // Medical & Healthcare
  {
    name: "ManualIdentifier",
    component: ManualIdentifierIcon,
    category: "Medical",
  },
  { name: "Prescription", component: PrescriptionIcon, category: "Medical" },
  {
    name: "SystemIdentifier",
    component: SystemIdentifierIcon,
    category: "Medical",
  },

  // System
  { name: "Eye", component: EyeIcon, category: "System" },
  { name: "Settings", component: SettingsIcon, category: "System" },
];

const IconGallery = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedSize, setSelectedSize] = useState<"sm" | "md" | "lg">("md");

  const categories = [
    "All",
    ...Array.from(new Set(allIcons.map((icon) => icon.category || "Other"))),
  ];

  const filteredIcons = allIcons.filter((icon) => {
    const matchesSearch = icon.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || icon.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Icon Gallery</h1>
        <p className="text-gray-600">
          Browse and search through all available icons
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search icons by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 pl-10 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <SearchIcon
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size="sm"
          />
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="flex gap-2">
            <label className="font-semibold text-sm text-gray-700">
              Category:
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-1 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-2">
            <label className="font-semibold text-sm text-gray-700">Size:</label>
            <div className="flex gap-1 border-2 border-gray-300 rounded-lg overflow-hidden">
              {(["sm", "md", "lg"] as const).map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-1 text-sm font-medium transition ${
                    selectedSize === size
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {size.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4 text-sm text-gray-600">
        Showing {filteredIcons.length} of {allIcons.length} icons
      </div>

      {/* Icon Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
        {filteredIcons.map(({ name, component: IconComponent, category }) => (
          <div
            key={name}
            className="flex flex-col items-center justify-center p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition cursor-pointer group"
            title={`${name}${category ? ` (${category})` : ""}`}
          >
            <div className="mb-2 text-gray-700 group-hover:text-blue-500 transition">
              <IconComponent size={selectedSize} />
            </div>
            <span className="text-xs text-center text-gray-600 group-hover:text-blue-600 font-medium">
              {name}
            </span>
            {category && (
              <span className="text-[10px] text-gray-400 mt-1">{category}</span>
            )}
          </div>
        ))}
      </div>

      {filteredIcons.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <SearchIcon className="mx-auto mb-4 text-gray-300" size="lg" />
          <p>No icons found matching "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
};

const meta: Meta = {
  title: "Icons/Gallery",
  component: IconGallery,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj;

export const AllIcons: Story = {
  render: () => <IconGallery />,
};
