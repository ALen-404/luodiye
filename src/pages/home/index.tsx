import React, { useState } from 'react';
import Slider from "react-slick";
import { FaCommentDots } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
type TabKey = 'about' | 'commission' | 'macau' | 'navigation';

const HomePage = () => {
const [activeTab, setActiveTab] = useState<TabKey>('about');

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false
  };

 const tabContent: Record<TabKey, React.ReactNode> = {
  about: (
    <img
      src="https://picsum.photos/600/300?random=1"
      alt="关于我们"
      className="w-full rounded-lg shadow-lg"
    />
  ),
  commission: (
    <img
      src="https://picsum.photos/600/300?random=2"
      alt="佣金方案"
      className="w-full rounded-lg shadow-lg"
    />
  ),
  macau: (
    <img
      src="https://picsum.photos/600/300?random=3"
      alt="澳门会展"
      className="w-full rounded-lg shadow-lg"
    />
  ),
  navigation: (
    <div className="grid grid-cols-4 gap-4">
      {[1, 2, 3, 4].map(i => (
        <a
          key={i}
          href={`https://example.com/partner${i}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-center"
        >
          <img
            src={`https://picsum.photos/100/100?random=${10 + i}`}
            alt={`合作方 ${i}`}
            className="rounded-full border-4 border-white shadow-md hover:scale-105 transition"
          />
        </a>
      ))}
    </div>
  ),
};

  return (
    <div className="bg-gradient-to-b from-purple-800 via-pink-600 to-red-500 text-white min-h-screen relative pb-24">
      {/* 固定顶部横幅 */}
      <div className="fixed top-0 left-0 right-0 bg-black bg-opacity-70 backdrop-blur-md z-50 flex justify-between items-center px-4 py-2 shadow-lg">
        <div className="text-white text-sm">🚀 飞鱼加官网聊天工具</div>
        <button className="bg-gradient-to-r from-pink-500 to-yellow-400 text-black px-4 py-1 rounded-full font-bold hover:scale-105 transition">
          立即下载
        </button>
      </div>

      <div className="pt-16 px-4 space-y-6">
        {/* 联系方式 */}
        <div className="flex items-center gap-3 bg-white bg-opacity-10 rounded-xl p-4 shadow-lg">
          <FaCommentDots className="text-yellow-300 text-2xl" />
          <div>
            <p className="text-base font-semibold">飞鱼加客服 ID: cy8888</p>
            <p className="text-sm text-gray-200">点击图标联系客服</p>
          </div>
        </div>

        {/* 轮播图 */}
        <Slider {...carouselSettings} className="rounded-xl overflow-hidden shadow-xl">
          {[4, 5, 6].map(i => (
            <div key={i}>
              <img
                src={`https://picsum.photos/600/300?random=${i}`}
                alt={`Slide ${i}`}
                className="w-full h-60 object-cover"
              />
            </div>
          ))}
        </Slider>

        {/* Tab 按钮 */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { key: 'about', label: '关于我们' },
            { key: 'commission', label: '佣金方案' },
            { key: 'macau', label: '澳门会展' },
            { key: 'navigation', label: '创意导航' },
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

        {/* Tab 内容 */}
        <div className="bg-white/10 rounded-xl p-4 backdrop-blur-md shadow-inner min-h-[200px]">
          {tabContent[activeTab]}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
