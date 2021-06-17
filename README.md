# TalkingMoAI

라즈베리파이로 만든 모AI 입니다.

## 실행 전 해야할 것

-   모든 작업을 하기 전에 sudo -s 명령어를 입력하여 root에서 실행하도록 합니다.
-   프로젝트 설치
    -   git clone https://github.com/maemenaver/TalkingMoAI.git
-   google api tts 서비스 키 발급
-   redis 설치
    -   apt-get update
    -   apt install -y redis-server
-   nestJS 설치
    -   node 설치 (V12.21.0 ~ V16.0 작동 확인)
        -   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash
        -   source ~/.bashrc
        -   nvm install v14.17.1
    -   npm install

## 실행

-   npm run start
