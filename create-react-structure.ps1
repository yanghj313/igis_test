# ============================
# IGIS Homepage React Template Generator
# Author: ChatGPT
# ============================

Write-Host "🚀 IGIS React 리팩토링용 폴더 구조를 생성 중입니다..."

# 기본 경로
$root = Get-Location

# 폴더 구조 정의
$folders = @(
    "src/assets/css",
    "src/assets/font",
    "src/assets/img",
    "src/components/Header",
    "src/components/Footer",
    "src/components/ScrollTop",
    "src/components/Loading",
    "src/components/Card",
    "src/pages/Main",
    "src/pages/Company",
    "src/pages/Business",
    "src/pages/Solution",
    "src/pages/Contact",
    "src/pages/Recrultment",
    "src/redux",
    "src/routes",
    "src/utils"
)

# 폴더 생성
foreach ($folder in $folders) {
    $path = Join-Path $root $folder
    if (-not (Test-Path $path)) {
        New-Item -ItemType Directory -Path $path | Out-Null
        Write-Host "📁 폴더 생성됨: $folder"
    } else {
        Write-Host "⚠️ 이미 존재함: $folder"
    }
}

# 기본 파일 생성
$files = @{
    "src/App.tsx" = @"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "@components/Header/Header";
import Footer from "@components/Footer/Footer";
import ScrollTop from "@components/ScrollTop/ScrollTop";
import MainContainer from "@pages/Main/MainContainer";
import CompanyRoutes from "@routes/CompanyRoutes";
import BusinessRoutes from "@routes/BusinessRoutes";
import SolutionRoutes from "@routes/SolutionRoutes";
import ContactUs from "@pages/Contact/ContactUs";
import RecrultmentContainer from "@pages/Recrultment/RecrultmentContainer";
import RecrultmentDetail from "@pages/Recrultment/RecrultmentDetail";
import { useEffect, useState } from "react";
import { UserAgentType } from "@utils/common.interface";

const App = () => {
  const [userAgent, setUserAgent] = useState<UserAgentType>("pc");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) setUserAgent("mb");
      else if (width < 1440) setUserAgent("tablet");
      else setUserAgent("pc");
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <BrowserRouter>
      <Header userAgent={userAgent} />
      <ScrollTop />
      <Routes>
        <Route path="/" element={<MainContainer userAgent={userAgent} />} />
        <Route path="/company/*" element={<CompanyRoutes userAgent={userAgent} />} />
        <Route path="/business/*" element={<BusinessRoutes userAgent={userAgent} />} />
        <Route path="/solution/*" element={<SolutionRoutes userAgent={userAgent} />} />
        <Route path="/contactus" element={<ContactUs userAgent={userAgent} />} />
        <Route path="/recrultment" element={<RecrultmentContainer userAgent={userAgent} />} />
        <Route path="/recrultment/detail/*" element={<RecrultmentDetail userAgent={userAgent} />} />
      </Routes>
      <Footer userAgent={userAgent} />
    </BrowserRouter>
  );
};

export default App;
"@

    "src/utils/common.interface.ts" = @"
export type UserAgentType = 'pc' | 'tablet' | 'mb';
"@

    "src/main.tsx" = @"
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
"@

    "src/components/Header/Header.tsx" = @"
// Example Header Component
import React from 'react';

type Props = {
  userAgent: 'pc' | 'tablet' | 'mb';
};

const Header = ({ userAgent }: Props) => {
  return (
    <header>
      <h1>IGIS Header ({userAgent})</h1>
    </header>
  );
};

export default Header;
"@

    "src/components/Footer/Footer.tsx" = @"
import React from 'react';

const Footer = () => {
  return (
    <footer>
      <p>© IGIS Corporation. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
"@

    "src/routes/CompanyRoutes.tsx" = @"
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Company from '@pages/Company/Company';
import Award from '@pages/Company/Award';
import News from '@pages/Company/News';

const CompanyRoutes = ({ userAgent }: { userAgent: 'pc' | 'tablet' | 'mb' }) => (
  <Routes>
    <Route path="/" element={<Company userAgent={userAgent} />} />
    <Route path="/award" element={<Award userAgent={userAgent} />} />
    <Route path="/news" element={<News userAgent={userAgent} />} />
  </Routes>
);

export default CompanyRoutes;
"@
}

# 파일 생성
foreach ($file in $files.Keys) {
    $path = Join-Path $root $file
    if (-not (Test-Path $path)) {
        New-Item -ItemType File -Path $path -Force | Out-Null
        Set-Content -Path $path -Value $files[$file]
        Write-Host "📝 파일 생성됨: $file"
    } else {
        Write-Host "⚠️ 이미 존재함: $file"
    }
}

Write-Host "`n✅ IGIS React 템플릿 구조 생성 완료!"
Write-Host "👉 src/ 폴더를 열고 기존 .tsx 파일들을 각 폴더에 옮겨 넣으세요."
