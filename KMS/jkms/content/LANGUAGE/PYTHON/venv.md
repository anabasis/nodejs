# Python 환경설정

<https://dojang.io/mod/page/view.php?id=2470>

## Python 가상 환경 설정

- 파이썬에서는 한 라이브러리에 대해 하나의 버전만 설치가 가능합니다.
- 여러개의 프로젝트를 진행하게 되면 이는 문제가 됩니다. 작업을 바꿀때마다 다른 버전의 라이브러리를 설치해야합니다.
- 이를 방지하기 위한 격리된 독립적인 가상환경을 제공합니다.
- 일반적으로 프로젝트마다 다른 하나의 가상환경을 생성한 후 작업을 시작하게 됩니다.
- 가상환경의 대표적인 모듈은 3가지가 있습니다.
  - venv : Python 3.3 버전 이후 부터 기본모듈에 포함됨
  - virtualenv : Python 2 버전부터 사용해오던 가상환경 라이브러리, Python 3에서도 사용가능
  - conda : Anaconda Python을 설치했을 시 사용할 수있는 모듈
  - pyenv : pyenv의 경우 Python Version Manger임과 동시에 가상환경 기능을 플러그인 형태로 제공

### venv

- 안타깝지만 venv 모듈은 pyenv의 버그로 인해, 제가 현재 작성할 환경이 안됩니다.
    <https://askubuntu.com/questions/488529/pyvenv-3-4-error-returned-non-zero-exit-status-1>
- pyenv환경이 아닌 분들을 위해 다른 링크로 대체합니다.
    <https://tutorial.djangogirls.org/ko/django_installation/>

### virtualenv

- virtualenv모듈을 사용하려면 pip 명령어로 모듈을 설치해야합니다.

    ```bash
    pip install virtualenv
    ```

- virtualenv로 가상환경을 생성합니다.

    ```bash
    virtualenv 가상환경명
    ```

- 가상환경을 구동해줍니다.
- Mac 또는 리눅스에서 가상환경 구동 방법입니다.

    ```bash
    source 가상환경명/bin/activate
    ```

- Windows 가상환경 구동방법입니다.
가상환경명/Scripts/activate
가상환경이 구동되면 터미널창의 프롬프트가 아래와 같이 변경됩니다.(터미널에 따라 약간 모양이 다를 수 있습니다.)
(가상환경명) $
이렇게 가상환경으로 변경된 상태에서 pip 명령어로 패키지를 install하면 별도의 격리된 공간에 라이브러리가 설치됩니다.

가상환경을 빠져나오는 명령어

$ deactivate
3. conda
conda 역시 pyenv 환경에서는 정상적으로 가상환경이 격리되지 않았습니다. 아래 설명은 pyenv가 아닌 환경에서만 유효합니다.
conda는 사실 가상환경만을 구성하는 모듈은 아닙니다.
anaconda python의 정보를 확인하고, pip와 마찬가지로 패키지 인스톨 기능이 있으며 그리고 가상환경을 설치할수 있는 기능이 있습니다.

conda 명령어로 가상환경을 만들어 보겠습니다.

create 가 가상환경을 만드는 서브명령어이며 -n이 이름을 명시하는 옵션입니다.
$ conda create -n 가상환경명
가상환경을 활성화 합니다.
$ source activate 가상환경명
가상환경을 비활성화 합니다.
$ source deactivate
4. pyenv
사실상 pyenv를 설치하게되면 conda, venv는 잘 격리되지 않는 것 같습니다. 혹시 다른 정보나 틀린 정보있으면 제보 부탁합니다.
pyenv는 파이썬 버전관리 툴이면서 동시에 가상환경을 플러그인 형태로 제공합니다.
pyenv 플러그인을 설치해보겠습니다.

먼저 pyenv-virtualenv git repository를 클론하고 bash_profile에 정보를 추가합니다.

zsh 사용시 .bash_profile 대신에 .zshenv 을 입력합니다.
$ git clone https://github.com/pyenv/pyenv-virtualenv.git ~/.pyenv/plugins/pyenv-virtualenv
$ echo 'eval "$(pyenv virtualenv-init -)"' >> ~/.bash_profile
위에 내용을 적용하기 위해 아래명령어를 입력합니다.
$ source ~/.bash_profile
플러그인 설치가 완료되었습니다.
pyenv에서 가상환경을 설정해봅니다.
파이썬인터프리터명 은 pyenv versions 에 나오는 설치되어있는 파이썬 인터프리터 명칭을 입력합니다.
$ pyenv virtualenv 파이썬인터프리터명 가상환경명
가상환경을 활성화 합니다.
$ pyenv activate 가상환경명
가상환경을 비활성화 합니다.
$ pyenv deactivate
❈ 파이썬인터프리터명을 anaconda 시리즈로 지정할 시에는 conda activate 명령어로 가상환경 활성화가 가능합니다.