<?php


function firstCheck($x,$y,$r){
    return !is_numeric($x) || $x <= -5 || $x >=3 || !is_numeric($y) || $y <= -5 || $y >=5 || !in_array($r, array(1,2,3,4,5));
}

function checkArea($x,$y,$r){
    if (($x>=0 && $x <= $r/2 && $y>=0 && $y <= $r) || ($x>=0 && $y<=0 && $y>=($x - $r/2)) || ($x<=0 && $y<=0 && ($y*$y+$x*$x) <= ($r*$r))){
        return 'Вошло';
    }
    else{
        return 'Не вошло';
    }
}

session_start(); //сессия начинается

date_default_timezone_set('Europe/Moscow'); //устанавливает временную зону по умолчанию для всех функций даты/времени в скрипте

$start = microtime(true); //заводим секундомер

$x_first = str_replace(",",".",$_POST['x']);
$y_first = str_replace(",",".",$_POST['y']);
$r_first = $_POST['r']; //достаем значения

if (firstCheck($x_first,$y_first,$r_first) ||($_SERVER['REQUEST_METHOD'] != 'POST')){
    http_response_code(400);
    return;
}

$x = (double) $x_first;
$y = (double) $y_first;
$r = (double) $r_first;

if (firstCheck($x,$y,$r) ||($_SERVER['REQUEST_METHOD'] != 'POST')){
    http_response_code(400);
    return;
}

$result = checkArea($x,$y,$r);
$time = number_format( microtime(true) - $start,10, ".", "")*1000000;
$currentTime = date("H:i:s");

$political_result = array($result,$x,$y,$r,$currentTime,$time);

if(!isset($_SESSION['queue'])){
    $_SESSION['queue'] = array();
}

array_push($_SESSION['queue'],$political_result);

echo '<table  border="1">
        <tr>
            <th width="100">Попал?</th>
            <th>Координата X</th>
            <th>Координата Y</th>
            <th>Радиус</th>
            <th>Текущее время</th>
            <th>Врамя запроса</th>
            </tr>';
foreach ($_SESSION['queue'] as $queue)
{
    echo "<tr>
                <td>$queue[0]</td>
                <td>$queue[1]</td>
                <td>$queue[2]</td>
                <td>$queue[3]</td>
                <td>$queue[4]</td>
                <td>$queue[5]</td>
                </tr>";
}
echo'</table>';
