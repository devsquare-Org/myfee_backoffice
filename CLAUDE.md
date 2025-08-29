# CLAUDE.md

이 파일은 Claude Code (claude.ai/code)가 이 저장소에서 코드를 작업할 때 가이드를 제공합니다.

## 언어 설정

- 모든 응답과 설명은 한국어로 작성해주세요
- 코드 리뷰, 에러 분석, 기술 문서 등 모든 커뮤니케이션을 한국어로 해주세요

## 선호하는 코딩 패턴

- 데이터 패치는 해당 페이지에 `_action/data.ts`에 `"use server"` 선언 후 함수를 만들고 이 함수를 필요한 컴포넌트 파일에서 호출
- 데이터 전송은 해당 페이지에 `_action/action.ts`에 `"use server"` 선언 후 함수를 만들고 이 함수를 필요한 컴포넌트 파일에서 호출
- 데이터 패치는 가급적 서버 컴포넌트에서 호출하여 하위 클라이언트 컴포넌트에게 전달하고 이런 흐름이 어려운 경우에만 클라이언트 컴포넌트에서 서버액션 호출
- 라우트가 되는 폴더의 최상위 파일인 `page.tsx`는 항상 서버 컴포넌트를 유지하고 상태 관리, 폼 등 `"use client"` 선언이 필요한 경우 하위 컴포넌트로 만들어서 `page.tsx`에서 호출

## 명령어

### 개발

- `npm run dev` - 개발 서버 시작
- `npm run build` - 프로덕션 빌드
- `npm run start` - 프로덕션 서버 시작
- `npm run lint` - ESLint 실행

### 설치

- `npm install` - 의존성 설치

## 아키텍처 및 구조

### 프로젝트 개요

MyFee를 위한 Next.js 15 백오피스 애플리케이션으로, https://myfee-backoffice.vercel.app 에 배포되어 있습니다. MyFee 모바일 앱의 배너, 사용자, 알림, 챌린지, 쿠폰 등 다양한 기능을 관리합니다.

### 핵심 아키텍처 패턴

#### 서버 액션 패턴

`next-safe-action`과 함께 Next.js 서버 액션을 사용하여 타입 안전한 서버 작업을 수행합니다:

- 액션은 `@/lib/utils`의 `actionClient`를 사용하여 `_action/action.ts` 파일에서 정의
- 데이터 가져오기 함수는 `_action/data.ts` 파일에 위치
- Zod를 사용한 스키마는 `_action/schema.ts` 파일에서 정의
- 모든 서버 함수는 `"use server"`로 마크됨

#### 라우트 구조

Next.js App Router를 일관된 패턴으로 사용:

- 메인 페이지: `src/app/[기능]/page.tsx`
- 동적 라우트: `src/app/[기능]/[id]/page.tsx`
- 컴포넌트: `src/app/[기능]/_components/`
- 서버 액션: `src/app/[기능]/_action/`

#### 컴포넌트 구성

- 전역 컴포넌트: `src/components/`
- UI 컴포넌트 (shadcn/ui): `src/components/ui/`
- 기능별 컴포넌트: `src/app/[기능]/_components/`

### 주요 기능 및 상태 (README 기준)

- ✅ 대시보드 (날짜 필터)
- ❌ 챌린지 리스트 (미구현)
- ❌ 챌린지 인증 (미구현)
- ✅ 유저 관리 (날짜 필터, 이름 검색이 있는 리스트)
- ❌ 유저 상세 (미구현)
- ✅ 푸시 알림 (발송 내역, 발송)
- ❌ 쿠폰 관리 (미구현)
- ✅ 배너 관리 (드래그 앤 드롭이 있는 리스트, CRUD 기능)

### 레이아웃 및 네비게이션

- 사이드바 네비게이션이 있는 메인 레이아웃: `src/app/layout.tsx`
- 사이드바 메뉴 정의: `src/components/sidebar.tsx`
- 한국어 라벨과 함께 중앙에서 관리되는 라우트: `src/lib/routes-config.ts`
- 모바일 기기 차단 (태블릿+ 전용)
- `next-themes`를 통한 테마 지원

### 데이터 및 상태 관리

- 현재 시뮬레이션된 지연(`setTimeout`)과 함께 모크 데이터 사용
- 서버 액션이 폼 제출 및 변경사항 처리
- 타입 검증을 위한 Zod 스키마
- Sonner를 통한 토스트 알림

### 스타일링

- 사용자 정의 폰트(DM Sans)와 함께 Tailwind CSS 사용
- shadcn/ui 컴포넌트 라이브러리
- 다크/라이트 테마 지원
- 반응형 디자인 (태블릿+ 전용, 모바일 차단됨)

### 주요 유틸리티

- 클래스 병합을 위한 `cn()` 함수 (clsx + tailwind-merge)
- 타입 안전한 서버 액션을 위한 `actionClient`
- `routes-config.ts`의 라우트 상수 및 라벨
- 브레이크포인트 및 재검증을 위한 `src/hooks/`의 커스텀 훅
