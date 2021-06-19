# TalkingMoAI

라즈베리파이로 만든 모AI 입니다.

## 실행 전 해야할 것

-   프로젝트 설치
    -   git clone https://github.com/maemenaver/TalkingMoAI.git
-   google api tts 서비스 키 발급
-   redis 설치
    -   apt-get update
    -   apt install -y redis-server
    -   (추가적으로 bind를 설정해야할 수 있습니다.)
-   nestJS 설치
    -   node 설치 (v14.17.1 LTS 버전 권장)
        -   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash
        -   source ~/.bashrc
        -   nvm install v14.17.1
    -   npm install
-   .env.development.tmp 세팅

## 실행

-   npm run start
