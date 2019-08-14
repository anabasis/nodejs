# ORACLE 모니터링

<https://theone79.tistory.com/799>
<https://zzikjh.tistory.com/entry/oracle-%EC%98%A4%EB%9D%BC%ED%81%B4-%EB%AA%A8%EB%8B%88%ED%84%B0%EB%A7%81-%EC%BF%BC%EB%A6%AC%EB%AA%A8%EC%9D%8C>
<https://redkite777.tistory.com/entry/%EC%98%A4%EB%9D%BC%ED%81%B4DB%EC%8B%A4%EC%8B%9C%EA%B0%84-%EB%AA%A8%EB%8B%88%ED%84%B0%EB%A7%81-%EB%AC%B8%EC%9E%A5>
<https://gurupark.tistory.com/4>
------------------------------------------------------------------------------------------------------------

내용을 복사하여 sql로 만드셔서 sqlplus 를 이용하여 실행시켜 주시면 mon_result.out 파일로 출력하도록 해놨습니다.

------------------------------------------------------------------------------------------------------------




SET ECHO OFF

SET FEEDBACK OFF

CLEAR COLUMNS;

SPOOL mon_result.out


PROMPT *******************************************************
PROMPT * by LEE, HAE YEOB in DBSC 2011 *

PROMPT *******************************************************

PROMPT

PROMPT *******************************************************
PROMPT * *
PROMPT * LIBRARY CACHE TUNING *
PROMPT * *
PROMPT *******************************************************
PROMPT

SELECT TO_CHAR(TRUNC(SUM(reloads)/SUM(pins)*100, 5),99.99999)||
'% (LESS THAN 1%)' "LIBRARY CACHE MISS RATIO"
FROM V$LIBRARYCACHE;

PROMPT
PROMPT # libary cache miss ratio is good if it is less than 1 -2 %
PROMPT # ratio를 늘리려면 shared pool size의 값을 증가 시켜야 한다.
PROMPT

PROMPT
PROMPT *******************************************************
PROMPT * *
PROMPT * DICTIONARY CACHE TUNING *
PROMPT * *
PROMPT *******************************************************
PROMPT

COLUMN Parameter Heading "INIT.ORA PARAMETER"
COLUMN Parameter FORMAT A22
COLUMN "HIT %" FORMAT 99990.0

SELECT UPPER(Parameter) Parameter, Gets, Getmisses,
(DECODE(Gets,0,1,Gets)-Getmisses)*100/DECODE(Gets,0,1,Gets) "HIT %",
Count, Usage
FROM V$ROWCACHE;

SELECT TRUNC(SUM(getmisses)/SUM(gets)*100, 5)||'% (LESS THAN 9.8%)'
"DATA DICTIONARY MISS RATIO "
FROM V$ROWCACHE;

PROMPT
PROMPT # data dictionary miss ratio is good if it is less than 9.8%
PROMPT # ratio를 늘리려면 shared pool size의 값을 증가 시켜야 한다.
PROMPT

PROMPT
PROMPT *******************************************************
PROMPT * *
PROMPT * Shared Pool의 사용 상태 *
PROMPT * *
PROMPT *******************************************************
PROMPT

SET SERVEROUTPUT ON
COLUMN misses FORMAT 999,999,999
COLUMN gets FORMAT 999,999,999,999

DECLARE
object_mem number;
shared_sql number;
cursor_mem number;
mts_mem number;
used_pool_size number;
free_mem number;
pool_size varchar2(512);
BEGIN

SELECT SUM(sharable_mem)
INTO object_mem
FROM V$DB_OBJECT_CACHE;

SELECT SUM(sharable_mem)
INTO shared_sql
FROM V$SQLAREA;

SELECT SUM(250*users_opening)
INTO cursor_mem
FROM V$SQLAREA;

SELECT SUM(value)
INTO mts_mem
FROM V$SESSTAT s, V$STATNAME n
WHERE s.statistic#=n.statistic#
AND n.name='session uga memory max';

SELECT sum(bytes)
INTO free_mem
FROM V$SGASTAT
WHERE name='free memory';

used_pool_size := ROUND(1.2*(object_mem+shared_sql+cursor_mem+mts_mem));

SELECT value
INTO pool_size
FROM V$PARAMETER
WHERE name='shared_pool_size';

dbms_output.put_line('Object mem : '||TO_CHAR(object_mem,'999,999,999,999')||'bytes');

dbms_output.put_line('Shared SQL : '||TO_CHAR(shared_sql,'999,999,999,999')||'bytes');

dbms_output.put_line('Cursors : '||TO_CHAR(cursor_mem,'999,999,999,999')||'bytes');

dbms_output.put_line('MTS session : '||TO_CHAR(mts_mem,'999,999,999,999')||' bytes');

dbms_output.put_line('Free memory : '||TO_CHAR(free_mem,'999,999,999,999')||' bytes' ||'('||TO_CHAR(ROUND(free_mem/1024/1000,1))||'MB)');

dbms_output.put_line('Shared pool utilization(total) : '||TO_CHAR(used_pool_size, '999,999,999,999')||' bytes'||'('||TO_CHAR(ROUND(used_pool_size/1024/1000,1))||'MB)');

dbms_output.put_line('Shared pool allocation(actual) : '||' '||pool_size||' bytes'||'('||TO_CHAR(ROUND(pool_size/1024/1000,1)) ||'MB)');

dbms_output.put_line('Percentage Utilized : '||' '||TO_CHAR(ROUND(used_pool_size/pool_size*100)) ||' %');

END;
/

PROMPT

REM 계산의 편의를 위한 temporary TABLE buffer_cache 생성

DROP TABLE buffer_cache;

CREATE TABLE buffer_cache
( aa NUMBER(20),
bb NUMBER(20),
cc NUMBER(20)
);

INSERT INTO buffer_cache (aa) SELECT value FROM V$SYSSTAT
WHERE name = 'db block gets';
UPDATE buffer_cache SET bb = (SELECT value FROM V$SYSSTAT
WHERE name = 'consistent gets');
UPDATE buffer_cache SET cc = (SELECT value FROM V$SYSSTAT
WHERE name = 'physical reads');


PROMPT
PROMPT *******************************************************
PROMPT * 
PROMPT * BUFFER CACHE TUNING *
PROMPT * *
PROMPT *******************************************************
PROMPT

COLUMN hit FORMAT A30 HEADING 'BUFFER CACHE HIT RATIO'
COLUMN lr FORMAT 999,999,999,999 HEADING 'LOGICAL READS'
COLUMN pr FORMAT 999,999,999,999 HEADING 'PHYSICAL READS'

SELECT TRUNC((1 - (cc/(aa+bb)))*100, 5)||'% (MORE THAN 60-70%)' hit,
(aa+bb) lr , cc pr
FROM buffer_cache;

PROMPT
PROMPT # buffer_cache hit ratio is good if it is more than 60-70%
PROMPT # ratio를 늘리려면 parameter file의 db_buffer_blocks의 값을
PROMPT # 증가 시켜야 한다.
PROMPT

PROMPT
PROMPT *******************************************************
PROMPT * *
PROMPT * ROLLBACK SEGMENT'S WAIT RATIO *
PROMPT * *
PROMPT *******************************************************
PROMPT

COLUMN miss_ratio FORMAT A10
COLUMN ROLLBACK_NAME FORMAT A10


SELECT name "ROLLBACK_NAME",
TRUNC(waits/gets*100, 5)||'%' miss_ratio
FROM V$ROLLSTAT, V$ROLLNAME
WHERE V$ROLLSTAT.usn = V$ROLLNAME.usn;

PROMPT
PROMPT # MISS RATIO가 1~2% 이하 이어야 한다.
PROMPT # 1~2%보다 크면 ROLLBACK SEGMENT의 갯수를 늘려주어야 한다.
PROMPT

PROMPT
PROMPT *******************************************************
PROMPT * *
PROMPT * REDO LOG FILE'S WAIT RATIO *
PROMPT * *
PROMPT *******************************************************
PROMPT

SELECT value "REDO LOG REQUEST"
FROM V$SYSSTAT
WHERE name = 'redo log space requests';

PROMPT
PROMPT *******************************************************
PROMPT * *
PROMPT * Internal latch Contention *
PROMPT * *
PROMPT *******************************************************
PROMPT

COLUMN 'LATCH NAME' FORMAT A20
COLUMN gets FORMAT 999,999,999
COLUMN misses FORMAT 999,999
COLUMN sleeps FORMAT 999,999
COLUMN 'I_GETS' FORMAT 999,999,999
COLUMN 'I_MISSES' FORMAT 999,999

SELECT C.name "LATCH NAME", A.gets, A.misses, A.sleeps,
A.immediate_gets "I_GETS", A.immediate_misses "I_MISSES"
FROM V$LATCH A, V$LATCHHOLDER B, V$LATCHNAME C
WHERE A.addr = B.laddr(+)
AND A.latch# = C.latch#
AND C.name = 'cache buffers chains'
ORDER BY A.latch#;

PROMPT
PROMPT # I_GETS equals to immediate_gets
PROMPT # I_MISSES equals to immediate_misses
PROMPT # DB_BLOCK_BUFFERS를 조정한다.
PROMPT

SELECT C.name "LATCH NAME", A.gets, A.misses, A.sleeps,
A.immediate_gets "I_GETS", A.immediate_misses "I_MISSES"
FROM V$LATCH A, V$LATCHHOLDER B, V$LATCHNAME C
WHERE A.addr = B.laddr(+)
and A.latch# = C.latch#
and C.name = 'cache buffers lru chain'
ORDER BY A.latch#;

PROMPT
PROMPT # wait 시간을 줄이려면,
PROMPT # DB_BLOCK_BUFFERS와 DB_BLOCK_WRITE_BATCH를 증가시킨다.
PROMPT

SELECT C.name "LATCH NAME", A.gets, A.misses,
A.immediate_gets "I_GETS", A.immediate_misses "I_MISSES"
FROM V$LATCH A, V$LATCHHOLDER B, V$LATCHNAME C
WHERE A.addr = B.laddr(+)
AND A.latch# = C.latch#
AND C.name in ('redo allocation','redo copy')
ORDER BY A.latch#;

PROMPT

SELECT C.name "LATCH NAME",
NVL(misses/DECODE(gets,0,1),0) "MISSES_GETS RATIO",
NVL(immediate_misses/DECODE(immediate_gets,0,1),0)
"IMMEDIATE MISSES_GETS RATIO"
FROM V$LATCH A, V$LATCHHOLDER B, V$LATCHNAME C
WHERE A.addr = B.laddr(+)
AND A.latch# = C.latch#
AND C.name in ('redo allocation','redo copy')
ORDER BY A.latch#;

PROMPT
PROMPT # misses_gets ratio나 immediate misses_gets ratio가
PROMPT # 1%를 초과하면 Latch 경합 해소가 필요하다.
PROMPT # Redo allocation는 LOG_SMALL_ENTRY_MAX_SIZE(on multi-cpu)를
PROMPT # 줄임으로써 해결하고,
PROMPT # Redo copy는 LOG_SIMULTANEOUS_COPIES나
PROMPT # LOG_ENTRY_PREBUILD_THRESHHOLD를 늘린다.
PROMPT # 단, multi-cpu인 경우에 효과가 있다.
PROMPT

SELECT C.name "LATCH NAME", A.gets, A.misses, A.sleeps,
A.immediate_gets "I_GETS", A.immediate_misses "I_MISSES"
FROM V$LATCH A, V$LATCHHOLDER B, V$LATCHNAME C
WHERE A.addr = B.laddr(+)
AND A.latch# = C.latch#
AND C.name = 'row cache objects'
ORDER BY A.latch#;

PROMPT
PROMPT # 경합 해소를 위해 SHARED_POOL_SIZE를 증가시킨다.
PROMPT

PROMPT
ROMPT *******************************************************
PROMPT * *
PROMPT * INTERNAL SORT AND EXTERNAL SORT *
PROMPT * *
PROMPT *******************************************************
PROMPT

COLUMN name FORMAT A20

SELECT name, value
FROM V$SYSSTAT
WHERE name IN ('sorts (memory)', 'sorts (disk)');

PROMPT
PROMPT # MEMORY SORT에 비해 DISK SORT가 상대적으로 많으면
PROMPT # SORT_AREA_SIZE의 크기를 늘려 주어야 한다.
PROMPT

PROMPT
PROMPT *******************************************************
PROMPT * *
PROMPT * DATA FILE'S PHYSICAL READ, PHYSICAL WRITE NUMBER *
PROMPT * *
PROMPT *******************************************************
PROMPT
column name heading 'File Name' format a42
column phyrds heading 'Physical|Reads' format 9,999,990
column read_pct heading 'Reads|%' format 999.99
column phywrts heading 'Physical|Writes' format 9,999,990
column wrts_pct heading 'Writes|%' format 999.99

select name,
phyrds, phyrds * 100 / trw.p_read read_pct,
phywrts, phywrts * 100 / trw.p_wrt wrts_pct
from v$datafile df, v$filestat fs, (select sum(phyrds) p_read, sum(phywrts) p_wrt from v$filestat) trw
where df.file# = fs.file#;

PROMPT
PROMPT # 상대적으로 Physical Read / Write가 많은 Data File의 Object를
PROMPT # 분산하여 특정 Disk로 I/O 가 집중되는 것을 줄여 주도록 한다.
PROMPT

PROMPT
PROMPT *******************************************************
PROMPT * *
PROMPT * Pinging/False Pinging(OPS Only) *
PROMPT * *
PROMPT *******************************************************
PROMPT

REM SELECT file#, SUM(xnc)
REM FROM V$PING
REM GROUP BY file#;
REM SELECT file#, SUM(xnc)
REM FROM V$FALSE_PING
REM GROUP BY file#;

PROMPT
PROMPT # Pinging 과 False Pinging은 OPS상에서 없을수는 없으나 최소화가
PROMPT # Performance 향상을 위한 관건이 된다.
PROMPT # 이를 위해서는 'Design > Node간 업무 분장 > Lock Resource 분배'
PROMPT # 순으로 최소화를 꾀할수 있다.
PROMPT # Resource 재조정방법: init.ora에 gc_db_locks="file#=<integer>
PROMPT

PROMPT
PROMPT *******************************************************
PROMPT * *
PROMPT * Shared Server/Dispatcher Contention *
PROMPT * *
PROMPT *******************************************************
PROMPT

PROMPT * Session Data Memory 확인 *

SELECT SUM(value)||'bytes' "SESSION UGA MEMORY"
FROM v$sesstat st, v$statname sn
WHERE name='session uga memory'
and st.statistic# = sn.statistic#;

SELECT SUM(value)||'bytes' "MAX SESSION UGA MEMORY"
FROM v$sesstat st, v$statname sn
WHERE name='session uga memory max'
and st.statistic# = sn.statistic#;

PROMPT
PROMPT # 멀티쓰레드 서버로 연결할 사용자당 1k의 shared_pool_size 증가
PROMPT

PROMPT
PROMPT * Dispatcher Busy Rate *
PROMPT

COLUMN Protocol FORMAT a30
COLUMN TOTAL_BUSY_RATE FORMAT a20
COLUMN AVE_WAIT_TIME FORMAT a20

SELECT network "PROTOCOL",
TRUNC(SUM(busy)/(SUM(busy)+SUM(idle))*100, 5)||'%' "TOTAL_BUSY_RATE"
FROM V$DISPATCHER
GROUP BY network;

PROMPT
PROMPT # 50% 이상이면 Dispatcher 프로세스를 증가시킨다.
PROMPT

PROMPT
PROMPT * Response Queue Wait Time 의 튜닝 *
PROMPT

SELECT network "PROTOCOL",
DECODE(SUM(totalq),0,'NO RESPONSE',SUM(wait)/SUM(totalq)||'(1/100sec)') "AVE_WAIT_TIME"
FROM V$QUEUE Q, V$DISPATCHER D
WHERE Q.type = 'DISPATCHER'
AND Q.paddr = D.paddr
GROUP BY network;

PROMPT
PROMPT # Dispatcher 응답큐에 답을 기다리는 평균시간
PROMPT # 지속적으로 시간이 증가하면 Dispatcher 프로세스를 증가시킨다.
PROMPT

PROMPT
PROMPT * Request Queue Wait Time =Shared Server contention 의 튜닝 *
PROMPT

SELECT DECODE(totalq,0,'NO REQUEST',wait/totalq||'(1/100sec)')
"AVERAGE WAIT TIME"
FROM V$QUEUE
WHERE type='COMMON';

PROMPT
PROMPT # 기다린 시간이 크면 MTS_MAX_SERVERS를 증가시킨다.
PROMPT

PROMPT
PROMPT *******************************************************
PROMPT * *
PROMPT * Disk Space *
PROMPT * *
PROMPT *******************************************************
PROMPT

PROMPT
PROMPT # background_dump_dest
PROMPT # core_dump_dest
PROMPT # user_dump_dest
PROMPT # log_archive_dest 등
PROMPT # DataBase의 정상적인 운용을 위한 Physical Disk Area의
PROMPT # 안정적 확보가 항시 가능하도록 주지 시킨다.
PROMPT

PROMPT
PROMPT *******************************************************
PROMPT * *
PROMPT * free space확보 *
PROMPT * *
PROMPT *******************************************************
PROMPT

col id format 99 heading 'ID'
col tn format a16 heading 'Name'
col fn format a26 heading 'Located in file_ID + File Name'
col bts format a12 heading 'Size'
col used format a11 heading 'Used'
col free format a11 heading 'Free'

prompt Tablespace Datafiles:
select d.tablespace_name tn,
to_char(f.file_id, '90') ||' '||file_name fn,
to_char(f.bytes/1024,'9,999,999')||'K' bts,
to_char( (f.bytes - s.f_byte)/1024,'9,999,999')||'K' used,
to_char( s.f_byte/1024,'9,999,999')||'K' free
from dba_tablespaces d, dba_data_files f, (select file_id,sum(bytes) f_byte from dba_free_space group by file_id) s
where d.tablespace_name = f.tablespace_name
and f.file_id = s.file_id(+)
order by 1, f.file_id;


PROMPT
PROMPT # 각 Tablespace의 Free Space를 Check하고 Table/Index의 Next Extent를
PROMPT # 위한 Contiguous Block Check한다. 만약 각 Object의 Extent를 위한 연속
PROMPT # Block이 없다면 Add Datafile을 하거나 Fragmentation이 심하다면
PROMPT # Collection을 위한 Migration을 실시 해야 한다.
PROMPT

PROMPT
PROMPT *******************************************************
PROMPT * *
PROMPT * TABLE/INDEX의 extents확인 *
PROMPT * *
PROMPT *******************************************************
PROMPT

column OWNER format a7
column SEG_NAME format a10
column TS_NAME format a10
column E_NUM format 999
column N_EXT(k) format 999,999
column M_FREE(k) format 999,999
column S_FREE(k) format 999,999

select ds.owner "OWNER", ds.segment_name "SEG_NAME",
ds.tablespace_name "TS_NAME",
ds.extents "E_NUM", ds.next_extent/1024 "N_EXT(k)",
fs.maxfree/1024 "M_FREE(k)", fs.sumfree/1024 "S_FREE(k)"
from ( select tablespace_name, sum(bytes) sumfree, max(bytes) maxfree
from dba_free_space
group by tablespace_name) fs,
( select owner, segment_name,tablespace_name,extents,next_extent
from dba_segments ) ds
where fs.tablespace_name=ds.tablespace_name
and fs.maxfree < (ds.next_extent + 10000000)
and ds.next_extent > 1048576;

PROMPT *******************************************************
PROMPT * *
PROMPT * extents 가 max extents에 근접한 obj *
PROMPT *******************************************************
exit




