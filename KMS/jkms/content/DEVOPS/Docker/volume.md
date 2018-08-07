# docker volume의 사용방법과 차이점

docker를 계속 사용하다 보면 container의 데이터 휘발성 때문에 volume을 사용하게 됩니다. volume 사용할 수 있는 방법은 대표적으론 4가지 정도가 있습니다 이번에는 이 방법들 소개와 그 차이에 대해 다룹니다.

그전에 volume 정보를 보는 방법에 대해 하나 알려드리겠습니다.

```bash
docker volume ls
```

위의 명령어를 통해 현재 생성되어 있는 일부 volume들의 정보가 노출됩니다. 왜 일부 volume이냐면 안나오는 놈들도 있습니다. 자세한 내용은 아래에서 확인하세요. 해쉬 id나 이름을 이용해 좀 더 세부정보를 확인할 수도 있습니다.

```bash
docker volume inspect {volume_id or volume_name}
```

혹시 따라 하신다면 위의 두개 명령어를 이용해서 정보를 확인해가면서 따라가면 좀 더 좋을 것 같습니다.

## 1. Dockerfile에서의 volume

첫번째로 Dockerfile에 volume을 선언할 수 있습니다.

```bash
FROM ubuntu:latest

volume ["/volume/path"]
```

이렇게 볼륨이 선언된 채 생성된 이미지의 경우 run되서 container로 올라갈 때 자동으로 해당 경로를 host에 연결하면서 올라갑니다. 그 경로는 `/var/lib/docker/volumes/{volume_name}` 에 만들어집니다.

```bash
# cd /var/lib/docker/volumes && ls
37c37549f7eff63aec8a56c42707a109dc7adb108926412848e4c268574d747d  metadata.db

# docker volume ls
DRIVER              VOLUME NAME
local               37c37549f7ef...(너무 길어 뒷부분 생략)

# docker inspect 37c37549f7ef...
[
    {
        "Driver": "local",
        "Labels": null,
        "Mountpoint": "/var/lib/docker/volumes/37c37549f7eff63aec8a56c42707a109dc7adb108926412848e4c268574d747d/_data",
        "Name": "37c37549f7eff63aec8a56c42707a109dc7adb108926412848e4c268574d747d",
        "Options": {},
        "Scope": "local"
    }
]
```

위를 보시면 딱 봐도 엄청 이상한 값이 이름으로 들어와 있죠? 이때 volume_name은 docker가 자동 생성한 hash 값이 들어갑니다. 이 방법의 장점이라고 한다면 Docker image만 제대로 만들면 내가 신경 쓰지 않아도 보관해야하는 데이터를 유지해준다는 것이 있겠네요. 하지만 개인적으로 제일 추천하지 않는 방법입니다. 왜냐면 이 container가 삭제됐을 때 대체 이 데이터가 어딨는지 찾아가기가 너무 어렵습니다. volume_name 자체가 너무 난해한 값이 들어가니까요. inspect로 정보를 봐도 대체 이 볼륨이 어떤 container때문에 생성됐던 것인지 아무런 힌트가 없습니다. volume을 사용하는 가장 큰 이유는 stateless하지 않은 application을 마치 stateless 한 것 처럼 만드는 것인데 관리가 안되서 사용하기 힘듭니다. 게다가 개인적으로 docker를 사용함으로써 얻는 최대 장점은 container의 짧은 라이프사이클이라고 생각하는데 이러면 나중에 재사용하기가 곤란하죠.

## 2. docker run할 때 -v 옵션 host에 바로 맵핑

docker run 할 당시에 -v 옵션으로 host file system과 연결하도록 선언할 수 있습니다.

```bash
docker run -itd -v /host/some/where:/container/some/where ubuntu
```

이런 식이죠. 아주 직관적으로 host의 file system과 container의 파일 시스템이 연결됩니다. 혹시 Dockerfile에 정의된 volume과 같은 경로를 잡는다면 run할 당시의 -v옵션이 image level의 volume을 오버라이드 합니다. Dockerfile에 뭐라 정의되어 있든 사용할 수 있다는 거죠.

좋은 점은 어디서 volume을 잡을지 아주 직관적으로 알 수 있고 volume mapping이 많아질 경우 폴더 구조를 예쁘게 가져가기 쉽습니다. 안 좋은 점은 docker volume ls 같은 명령어로 추적이 안됩니다. container를 run 시킨 사람이 알아서 잘 관리해줘야 한다는 것이죠.

## 3. docker run할 때 -v 옵션 volume create 이용

이번 방법은 2번과 마찬가지로 run 할 때 -v옵션으로 사용하지만 미리 만들어놓은 volume을 쓰는 방법입니다.

```bash
docker create volume volume_name
docker run -itd -v volume_name:/container/some/where ubuntu
```

이 방법은 1번과 2번의 장점을 조금은 합칠 수 있습니다. `/var/lib/docker/volumes`에 생성이 되긴 하나 volume_name으로 생성되기 때문에 hash 값으로 생성되는 1번 방법보다는 훨씬 관리하기 편하고 이름이 정해져 있기 때문에 짧은 container 라이프 사이클에서도 계속 사용하기 편합니다. 동시에 폴더가 이름으로 생성되어 훨씬 예쁘게 관리하기 쉽죠. 예를 들면 some-application-db-volume, some-application-app-volume 등의 이름으로 이게 무슨 볼륨인지 바로 알 수 있게 관리하기 쉽습니다. 그러면서 volume ls에서 확인도 가능하죠.

개인적으로 안 좋다고 생각하는건 /var/lib/docker에 계속 종속적이 되기 때문에 용량 관리에 신경을 써야합니다. 모든 container에서 생성되는 데이터가 거기 몰리니까요. disk full나면 난리 나죠. 또한 폴더 이름은 좋게 가져갈 수 있으나 관련 데이터 폴더를 구조적으로 가져갈 수는 없습니다. 하지만 마지막 단점은 3rd party의 driver를 사용하면 데이터 구조 문제는 해결할 수 있긴합니다.

## 4. volume container

마지막으로 volume container를 통해 volume을 연결할 수 있습니다. 1,2,3번 방법 중 하나로 이미 run 되어 있는 상태의 container를 바로 volume으로 잡는 방법인데 volume이 여러개일 때 관리가 쉽죠 예를 들면

```bash
docker run --name volume_container -itd -v $HOME/host-volume1:/container-volume1 -v $HOME/host-volume2:/container-volume2: -v $HOME/host-volume3:/container-volume3 ubuntu
# 이런식으로 volume이 잡힌 container를 하나 run하고
docker run --name=target_container --volumes-from=volume_container -itd ubuntu
```

이렇게 container 째로 volume을 붙이는 방법입니다. 같은 볼륨을 여러개의 컨테이너가 참조해야할 때 쓰면 좋죠. target_container에는 volume_container에 선언된 3개의 volume이 모두 마운트됩니다. 그리고 volume_container는 stop되어 있는 상태여도 괜찮습니다.

## 5. 2,3번 방식의 차이

이번 내용은 volume 자체 선언에 관한 내용은 아니고 2번 방법과 3번 방법의 동작 차이에 대해 설명하려 합니다. 물론 명확한 동작차이는 위에 설명해드렸죠. 여기서 다룰 것은 아주 사소한 동작차이 입니다.

2번 3번 모두 -v option을 통해 쓸 수 있다는 공통점을 가지지만 동작되는 방식에 아주 약간의 차이가 있는데요.

첫번째 -v 옵션으로 host를 바로 마운트시키는 방법입니다. host volume이 비어있고 container volume에 container.txt가 있다고 생각해봅시다. 이걸 마운트하면? 해당 volume은 빈 상태로 container가 런됩니다. 즉 host우선으로 맞추는거죠. 다시 예를 들어 host에 host.txt가 있고 container에 container.txt가 있다면? run 하고나면 host.txt만 남게됩니다. 주의해야겠죠.

반면에 3번 방법은 조금 다릅니다. 우선 두번째 케이스(host에 host.txt가 있고 container에 container.txt가 있는 상황)는 똑같습니다. host 우선으로 맞춰지죠. 근데 첫번째 케이스 host가 비워져있었다면? container의 내용이 그대로 남습니다. 즉, host볼륨에 아무것도 없고. container volume위치에 container.txt 파일이 존재했다면 3번 방법으로 volume 마운트시 run 한 후 확인해보면 container.txt 파일이 그대로 있습니다.

사실 큰 차이는 아닙니다. 왜냐면 mapping 할 volume 위치에 runtime 외의 시간에 데이터를 핸들링 하는 것은 절대 권장되지 않는 것이기 때문이죠. 그러니 그냥 이런 차이가 있다 정도로만 알면 될 것 같습니다.