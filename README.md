# The Daily Desk

업무 영어회화 학습 앱. 정적 프론트엔드(`index.html`) + Vercel 서버리스 함수(`api/issue.js`, `api/feedback.js`)로 구성되어 있어 Claude API 키가 브라우저에 노출되지 않습니다.

## 로컬 구조
- `index.html` — 프론트엔드. 데이터는 브라우저 `localStorage`에 저장됩니다 (기기별로 별도 저장, 로그인 없음).
- `api/issue.js` — 오늘의 이슈를 가져오는 서버리스 함수. `ANTHROPIC_API_KEY` 환경변수를 사용해 Anthropic API를 호출합니다.
- `api/feedback.js` — 스피킹 피드백을 생성하는 서버리스 함수.

## 배포 방법 (GitHub + Vercel)

1. GitHub에 새 저장소를 만들고 이 폴더를 push 합니다.
2. https://vercel.com 에서 GitHub로 로그인 후 "Add New Project"로 방금 만든 저장소를 import 합니다.
3. 프로젝트 설정의 Environment Variables에 아래 값을 추가합니다.
   - `ANTHROPIC_API_KEY` = (console.anthropic.com에서 발급받은 키)
4. Deploy를 누르면 `https://<프로젝트명>.vercel.app` 주소로 배포됩니다.

## 코드 수정 후 재배포

로컬에서 파일을 수정한 뒤:
```bash
git add .
git commit -m "update"
git push
```
Vercel이 GitHub 저장소 변경을 감지해 자동으로 재배포합니다.
