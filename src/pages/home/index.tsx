import React, { useState } from 'react';
import Slider from "react-slick";
import { FaCommentDots, FaTimes } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type TabKey = 'about' | 'commission' | 'macau' | 'navigation';

// 模块接口
interface Module {
  id: number;
  title: string;
  icon: string;
  images?: string[]; // 可选，仅用于需要弹窗的 Tab
  externalLink?: string; // 可选，仅用于 navigation Tab
}

// Tab 模块数据
const tabModules: Record<TabKey, Module[]> = {
  about: [
    {
      id: 1,
      title: "盈利模块 1",
      icon: "/images/Profitability/module1/icon.jpg",
      images: ["/images/Profitability/module1/1.jpg"],
    },
    {
      id: 2,
      title: "盈利模块 2",
      icon: "/images/Profitability/module2/icon.jpg",
      images: ["/images/Profitability/module2/1.jpg", "/images/Profitability/module2/2.jpg"],
    },
    {
      id: 3,
      title: "盈利模块 3",
      icon: "/images/Profitability/module3/icon.jpg",
      images: ["/images/Profitability/module3/1.jpg", "/images/Profitability/module3/2.jpg"],
    },
    {
      id: 4,
      title: "盈利模块 4",
      icon: "/images/Profitability/module4/icon.jpg",
      images: ["/images/Profitability/module4/1.jpg"],
    },
    {
      id: 5,
      title: "盈利模块 5",
      icon: "/images/Profitability/module5/icon.jpg",
      images: ["/images/Profitability/module5/1.jpg", "/images/Profitability/module5/2.jpg"],
    },
  ],
  commission: [
    {
      id: 1,
      title: "企业模块 1",
      icon: "/images/enterprise/module1/icon.jpg",
      images: ["/images/enterprise/module1/1.jpg"],
    },
    {
      id: 2,
      title: "企业模块 2",
      icon: "/images/enterprise/module2/icon.jpg",
      images: ["/images/enterprise/module2/1.jpg"],
    },
    {
      id: 3,
      title: "企业模块 3",
      icon: "/images/enterprise/module3/icon.jpg",
      images: ["/images/enterprise/module3/1.jpg"],
    },
    {
      id: 4,
      title: "企业模块 4",
      icon: "/images/enterprise/module4/icon.jpg",
      images: ["/images/enterprise/module4/1.jpg"],
    },
  ],
  macau: [
    {
      id: 1,
      title: "BTC模块 1",
      icon: "/images/btc/module1/icon.jpg",
      images: ["/images/btc/module1/1.jpg", "/images/btc/module1/2.png"],
    },
    {
      id: 2,
      title: "BTC模块 2",
      icon: "/images/btc/module2/icon.jpg",
      images: ["/images/btc/module2/1.png", "/images/btc/module2/2.jpg", "/images/btc/module2/3.jpg"],
    },
    {
      id: 3,
      title: "BTC模块 3",
      icon: "/images/btc/module3/icon.jpg",
      images: ["/images/btc/module3/1.jpg"],
    },
    {
      id: 4,
      title: "BTC模块 4",
      icon: "/images/btc/module4/icon.jpg",
      images: ["/images/btc/module4/1.jpg", "/images/btc/module4/2.jpg"],
    },
    {
      id: 5,
      title: "BTC模块 5",
      icon: "/images/btc/module5/icon.jpg",
      images: ["/images/btc/module5/1.jpg"],
    },
  ],
  navigation: [
    {
      id: 1,
      title: "蚂蚁矿池",
      icon: "/images/partner/ant.png",
      externalLink: "https://www.antpool.com/",
    },
    {
      id: 2,
      title: "VPN",
      icon: "/images/partner/vpn-icon.jpg",
      externalLink: "https://letsvpn.world/",
    },
    {
      id: 3,
      title: "欧意",
      icon: "/images/partner/okx-icon.jpg",
      externalLink: "https://www.okx.com/",
    },
    {
      id: 4,
      title: "币安",
      icon: "/images/partner/binance-icon.jpg",
      externalLink: "https://www.binance.com/",
    },
  ],
};

// 轮播图本地图片
const carouselImages = [
  "/images/swiper1.jpg",
  "/images/swiper2.jpg",
  "/images/swiper3.jpg",
];

const HomePage = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('about');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  // 处理模块点击
  const handleModuleClick = (module: Module) => {
    if (activeTab === 'navigation' && module.externalLink) {
      // 合作平台跳转到外部链接
      window.location.href = module.externalLink;
    } else {
      // 其他 Tab 打开弹窗
      setSelectedModule(module);
      setIsModalOpen(true);
    }
  };

  // 关闭弹窗
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedModule(null);
  };

  return (
    <div className="bg-gradient-to-b from-purple-800 via-pink-600 to-red-500 text-white min-h-screen relative pb-24">
      {/* 固定顶部横幅 */}
      <div className="fixed top-0 left-0 right-0 bg-black bg-opacity-70 backdrop-blur-md z-50 flex justify-between items-center px-4 py-2 shadow-lg">
        <div className="text-white text-sm">🚀 丝瓜官网聊天工具</div>
        <a
          href="https://ya.cn/index.html"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-r from-pink-500 to-yellow-400 text-black px-4 py-1 rounded-full font-bold hover:scale-105 transition"
        >
          立即下载
        </a>
      </div>

      <div className="pt-16 px-4 space-y-6">
        {/* 联系方式 */}
        <div className="flex items-center gap-3 bg-white bg-opacity-10 rounded-xl p-4 shadow-lg">
          <FaCommentDots className="text-yellow-300 text-2xl" />
          <div>
            <p className="text-base font-semibold">丝瓜加经理 ID: yooy66</p>
            <a
              href="https://ya.cn/share/index.html?scheme_type=1&qrtype=qr/qiyunxin/person/07EGPet7sXkhkLEKBWeYPFQVghll_AsK&verification_code=ac3246cfcbf919330ef96df5fef70f97"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-200"
            >
              点击图标联系客服
            </a>
          </div>
        </div>

        {/* 轮播图 */}
        <Slider {...carouselSettings} className="rounded-xl overflow-hidden shadow-xl">
          {carouselImages.map((src, index) => (
            <div key={index}>
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                className="w-full h-auto object-contain"
              />
            </div>
          ))}
        </Slider>

        {/* Tab 按钮 */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { key: 'about', label: '盈利分析' },
            { key: 'commission', label: '企业介绍' },
            { key: 'macau', label: 'BTC展望' },
            { key: 'navigation', label: '合作平台' },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as TabKey)}
              className={`py-2 rounded-full font-semibold text-sm transition-all ${
                activeTab === tab.key
                  ? 'bg-white text-black shadow-lg'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 内容 - 模块列表 */}
        <div className="bg-white/10 rounded-xl p-4 backdrop-blur-md shadow-inner min-h-[200px]">
          <div className="grid grid-cols-2 gap-4">
            {tabModules[activeTab].map(module => (
              <div
                key={module.id}
                onClick={() => handleModuleClick(module)}
                className="flex flex-col items-center gap-2 p-4 hover:bg-white/20 rounded-lg transition cursor-pointer"
              >
                <img
                  src={module.icon}
                  alt={`${module.title} icon`}
                  className="w-16 h-16 rounded-full shadow-md object-cover"
                />
                {/* <h3 className="text-base font-semibold text-center">{module.title}</h3> */}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 弹窗 */}
      {isModalOpen && selectedModule && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ">
          <div className="bg-gradient-to-b from-purple-800 via-pink-600 to-red-500 text-white rounded-xl p-6 max-w-md  mx-auto max-h-[80vh] overflow-y-auto bg-opacity-80 backdrop-blur-md shadow-2xl relative w-11/12">
            <FaTimes
              onClick={closeModal}
              className="absolute top-4 right-4 text-white text-xl cursor-pointer hover:text-gray-300 transition"
            />
            <h2 className="text-2xl font-bold mb-4">{selectedModule.title}</h2>
            <div className="grid grid-cols-1 gap-4">
              {selectedModule.images?.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Module Image ${index + 1}`}
                  className="w-full rounded-lg shadow-md"
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;