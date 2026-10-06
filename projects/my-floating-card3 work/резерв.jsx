import fonImage from '../../assets/images/fon0.svg';
import arrowImage from '../../assets/images/arrow/arrow0.svg';
import arrowHoverImage from '../../assets/images/arrow/arrow1.svg';
import rudaImage from '../../assets/images/ruda.png';
import rudaHoverImage from '../../assets/images/rudaHoverImage.png';
import skladgaliImage from '../../assets/images/skladgali.png';
import skladgaliHoverImage from '../../assets/images/skladgaliHoverImage.png';
import droblenieImage from '../../assets/images/droblenie1.png';
import droblenieHoverImage from '../../assets/images/droblenieHoverImage.png';
import droblenie2Image from '../../assets/images/droblenie2.png';
import droblenie2HoverImage from '../../assets/images/droblenie2HoverImage.png';
import avtomobiliImage from '../../assets/images/avtomobili1.png';
import otkritiepoluvagoniImage from '../../assets/images/otkritiepoluvagoni.png';
import skladImage from '../../assets/images/sklad.png';
import izmelchenieHoverImage from '../../assets/images/izmelchenieHoverImage.png';
import izmelchenieImage from '../../assets/images/izmelchenie1.png';
import grohochenieImage from '../../assets/images/grohochenie.png';
import grohochenieHoverImage from '../../assets/images/grohochenieHoverImage.png';
import klassifikatsiyaImage from '../../assets/images/klassifikatsiya.png';
import klassifikatsiyaHoverImage from '../../assets/images/klassifikatsiyaHoverImage.png';
import klassifikatsiya2Image from '../../assets/images/klassifikatsiya2.png';
import klassifikatsiya2HoverImage from '../../assets/images/klassifikatsiya2HoverImage.png';
import klassifikatsiya3Image from '../../assets/images/klassifikatsiya3.png';
import klassifikatsiya3HoverImage from '../../assets/images/klassifikatsiya3HoverImage.png';
import perechisnaya1Image from '../../assets/images/perechisnaya1.png';
import perechisnaya1HoverImage from '../../assets/images/perechisnaya1HoverImage.png';
import perechisnaya2Image from '../../assets/images/perechisnaya2.png';
import perechisnaya2HoverImage from '../../assets/images/perechisnaya2HoverImage.png';
import osnovnayaFlotatsiyaImage from '../../assets/images/osnovnayaFlotatsiya.png';
import osnovnayaFlotatsiyaHoverImage from '../../assets/images/osnovnayaFlotatsiyaHoverImage.png';
import kondicionirovanieImage from '../../assets/images/kondicionirovanie.png';
import kondicionirovanieHoverImage from '../../assets/images/kondicionirovanieHoverImage.png';
import kontrolnayaFlotatsiyaImage from '../../assets/images/kontrolnayaFlotatsiya.png';
import kontrolnayaFlotatsiyaHoverImage from '../../assets/images/kontrolnayaFlotatsiyaHoverImage.png';
import otvalnyeKhvostyImage from '../../assets/images/otvalnyeKhvosty.png';
import otvalnyeKhvostyHoverImage from '../../assets/images/otvalnyeKhvostyHoverImage.png';
import droizmelchenieImage from '../../assets/images/droizmelchenie.png';
import droizmelchenieHoverImage from '../../assets/images/droizmelchenieHoverImage.png';
import sguschenieImage from '../../assets/images/sguschenie.png';
import sguschenieHoverImage from '../../assets/images/sguschenieHoverImage.png';
import filtrovanieImage from '../../assets/images/filtrovanie.png';
import filtrovanieHoverImage from '../../assets/images/filtrovanieHoverImage.png';
import sushkaImage from '../../assets/images/sushka.png';
import sushkaHoverImage from '../../assets/images/sushkaHoverImage.png';
import slivvotvalImage from '../../assets/images/slivvotval.png';
import slivvotvalHoverImage from '../../assets/images/slivvotvalHoverImage.png';
import mednikoncetratImage from '../../assets/images/mednikoncetrat.png';
import mednikoncetratHoverImage from '../../assets/images/mednikoncetratHoverImage.png';
import vectorImage from '../../assets/images/vector-10.svg';
import infoImage from '../../assets/images/info.svg';
import React, { useState, useRef } from 'react';
import styles from './FloatingCard.module.css';


// Импортируем изображения
import img0 from '../../assets/images/imgoborudomanie/0.png';
import img1 from '../../assets/images/imgoborudomanie/1.png';
import img2 from '../../assets/images/imgoborudomanie/2.png';
import img3 from '../../assets/images/imgoborudomanie/3.png';
import img4 from '../../assets/images/imgoborudomanie/4.png';
import img5 from '../../assets/images/imgoborudomanie/5.png';
import img6 from '../../assets/images/imgoborudomanie/6.png';
import img7 from '../../assets/images/imgoborudomanie/7.png';
import img8 from '../../assets/images/imgoborudomanie/8.png';
import img9 from '../../assets/images/imgoborudomanie/9.png';
import img10 from '../../assets/images/imgoborudomanie/10.png';
import img11 from '../../assets/images/imgoborudomanie/11.png';
import img12 from '../../assets/images/imgoborudomanie/12.png';
import img13 from '../../assets/images/imgoborudomanie/13.png';
import img14 from '../../assets/images/imgoborudomanie/14.png';
import img15 from '../../assets/images/imgoborudomanie/15.png';
import img16 from '../../assets/images/imgoborudomanie/16.png';
import img17 from '../../assets/images/imgoborudomanie/17.png';
import img18 from '../../assets/images/imgoborudomanie/18.png';
import img19 from '../../assets/images/imgoborudomanie/19.png';
import img20 from '../../assets/images/imgoborudomanie/20.png';
import img21 from '../../assets/images/imgoborudomanie/21.png';
import img22 from '../../assets/images/imgoborudomanie/22.png';
import img23 from '../../assets/images/imgoborudomanie/23.png';
import img24 from '../../assets/images/imgoborudomanie/24.png';
import img25 from '../../assets/images/imgoborudomanie/25.png';
import img26 from '../../assets/images/imgoborudomanie/26.png';
import img27 from '../../assets/images/imgoborudomanie/27.png';
import img28 from '../../assets/images/imgoborudomanie/28.png';
import img29 from '../../assets/images/imgoborudomanie/29.png';
import img30 from '../../assets/images/imgoborudomanie/30.png';
import img31 from '../../assets/images/imgoborudomanie/31.png';
import img32 from '../../assets/images/imgoborudomanie/32.png';
import img33 from '../../assets/images/imgoborudomanie/33.png';
import img34 from '../../assets/images/imgoborudomanie/34.png';
import img35 from '../../assets/images/imgoborudomanie/35.png';
import img36 from '../../assets/images/imgoborudomanie/36.png';
import img37 from '../../assets/images/imgoborudomanie/37.png';
import img38 from '../../assets/images/imgoborudomanie/38.png';
import img39 from '../../assets/images/imgoborudomanie/39.png';
import img40 from '../../assets/images/imgoborudomanie/40.png';
import img41 from '../../assets/images/imgoborudomanie/41.png';
import img42 from '../../assets/images/imgoborudomanie/42.png';
import img43 from '../../assets/images/imgoborudomanie/43.png';

const excelData = [
  {
    name: "Первичные гирационные дробилки",
        description: "· Накладки - марганцовистая сталь.<br>· Вогнутые сегменты - марганцовистая сталь.<br>· Боковые накладки на дно корпуса - стандартные сплавы С, D, D1 и усиленные вставками из карбида титана.<br>· Колпачок-паук - марганцовистая сталь.<br>· Крестовинная втулка - марганцовистая сталь.<br>· Нижняя втулка корпуса - марганцовистая сталь.<br>· Шестерня и зубчатое колесо - марганцовистая сталь.<br>· Ступенчатые подшипники - марганцовистая сталь.",
        image: img1 // Используем импортированное изображение
      },
      {
        name: "Щековые дробилки",
        description: "· Футеровка – стальной сплав, эластомеры (резина, полиуретан) и износостойкие полимеры, в основном высокомолекулярный (ВМП) и сверхвысокомолекулярный (СВМПЭ) полиэтилен.<br>· Эксцентриковый вал - хромоникелевая сталь, хромомолибденовая сталь, ванадиевая сталь.<br>· Подшипники – сталь, керамика.<br>· Крепежные элементы – марганцевая сталь.<br>· Клинья - сталь, чугун.",
        image: img2 // Используем импортированное изображение
      },
      {
        name: "Конусные дробилки",
        description: "· Футеровка дробящего конуса - марганцовистая сталь<br>· Футеровка чаши - марганцовистая сталь, углеродистая легированная сталь и хромистый чугун.<br>· Футеровка рамы - марганцовистая сталь, углеродистая легированная сталь и хромистый чугун.<br>· Конус питания - марганцовистая сталь<br>· Футеровка главной рамы - марганцовистая сталь, углеродистая легированная сталь и хромистый чугун.<br>· Защитные конусы - марганцовистая сталь<br>· Футеровка траверс главной рамы - марганцовистая сталь, углеродистая легированная сталь и хромистый чугун.",
        image: img3 // Используем импортированное изображение
      },
      {
        name: "Ударные дробилки",
        description: "· Комплекты наконечников ротора - карбид вольфрама<br>· Запасные наконечники - карбида вольфрама<br>· Пластины для изнашивания наконечников / полостей - сталь с вставками из карбида вольфрама, высокохромистая сталь, мартенситная сталь, высокохромистый белый чугун.<br>· Верхние и нижние пластины для изнашивания - мартенситная сталь, высокохромистый белый чугун.<br>· Пластины с верхним и нижним выступами – бронзовый сплав: медный сплав, включающий добавки: олова, алюминия, марганца<br>· Подающая трубка и подающее кольцо с проушиной (eye ring): - углеродистая сталь<br>· Направляющие пластины - марганцовистая сталь, сплав на основе кобальта.<br>· Удерживающие планки - марганцовистая сталь, чугун.<br>· Конусные фиксаторы - марганцовистая сталь, мартенситная сталь, износостойкий (белый) чугун.<br>· Выступы ротора - марганцовистая сталь, мартенситная сталь, износостойкий (белый) чугун, сплавы с керамическими соединениями.<br>· Опорное кольцо и наковальни – бронза, бронзовый сплав: медный сплав, включающий добавки: олова, алюминия, марганца",
        image: img4 // Используем импортированное изображение
      },
      {
        name: "Валковые прессы высокого давления",
        description: "· Валки разных типов - кованая легированная сталь<br>· Дробящие плиты – высокомарганцевая сталь<br>· Шестерни – углеродистая сталь, легированная сталь, алюминий.<br>· Пластины – карбид вольфрама.<br>· Бандажи - сталь<br>· Пружины - высокоуглеродистая сталь, легированная ванадием, марганцем и кремнием.",
        image: img5 // Используем импортированное изображение
      },
      {
        name: "Шаровые мельницы",
        description: "",
        image: img6 // Используем импортированное изображение
      },
      {
        name: "Галечные мельницы",
        description: "",
        image: img7 // Используем импортированное изображение
      },
      {
        name: "Мельницы полусамоизмельчения",
        description: "",
        image: img8 // Используем импортированное изображение
      },
      {
        name: "Мельницы самоизмельчения",
        description: "",
        image: img8 // Используем импортированное изображение
      },
      {
        name: "Мельницы с перемешиванием мелющей среды",
        description: "",
        image: img9 // Используем импортированное изображение
      },
      {
        name: "Грохоты типа «банан»",
        description: "",
        image: img10 // Используем импортированное изображение
      },
      {
        name: "Горизонтальные грохоты»",
        description: "",
        image: img11 // Используем импортированное изображение
      },
      {
        name: "Наклонные грохоты»",
        description: "",
        image: img12 // Используем импортированное изображение
      },
      {
        name: "Портативные грохоты»",
        description: "",
        image: img13 // Используем импортированное изображение
      },
      {
        name: "Грохоты сверхтонкого грохочения»",
        description: "· Просеивающие поверхности:<br>· Колосниковые решетки – сталь<br>· Листовые решета – сталь,<br>· Проволочные сита – сталь, алюминий, никель, титан, цинк, медь<br>· Резиновые решета – износостойкие резины, или полиуретан<br>·Шпальтовые решета – металлическая проволока<br>· Струнные сита – стальная проволока, резиновые нити· Защита бортовин – полиуретановая футеровка<br>· Корзины для вибрационных и шнековых центрифуг – хромомарганцевоникелевая сложнолегированная аустенитная сталь<br>· Уплотнение конвейеров - резина, резино-(полиуретан)-керамика, износостойкая сталь, биметалл, высокомолекулярный полиэтилен и полиуретан.<br>· Форсунки для грохотов - полиуретан Сита - сталь, полиуретановые сита, резиновые сита.",
        image: img14 // Используем импортированное изображение
      },
      {
        name: "Гравитационный»",
        description: "",
        image: img0 // Используем импортированное изображение
      },
      {
        name: "Пневматический»",
        description: "",
        image: img0 // Используем импортированное изображение
      },
      {
        name: "Гидравлический»",
        description: "",
        image: img0 // Используем импортированное изображение
      },
      {
        name: "Мокро-механический»",
        description: "",
        image: img0 // Используем импортированное изображение
      },
      {
        name: "Центробежный»",
        description: "",
        image: img0 // Используем импортированное изображение
      },
      {
        name: "Электрический»",
        description: "",
        image: img0 // Используем импортированное изображение
      },
      {
        name: "Спиральный»",
        description: "",
        image: img0 // Используем импортированное изображение
      },
      {
        name: "Контактные чаны - титан»",
        description: "",
        image: img15 // Используем импортированное изображение
      },
      {
        name: "Баки - углеродистая сталь»",
        description: "",
        image: img16 // Используем импортированное изображение
      },
      {
        name: "Механические флотационные машины»",
        description: "· Аэроузлы – сталь, резиновая вулканизированная смесь, полиуретан.<br>· Подшипниковый блок – низкоуглеродистая сталь, латунь, полимерные материалы: полиамид, полиэтилен, полистирол.<br>· Промежуточный вал - сталь.<br>· Шкивы - чугун.<br>· Импеллер - сталь.<br>· Статор - полиуретан.<br> ",
        image: img17 // Используем импортированное изображение
      },
      {
        name: "Пневмомеханические флотационные машины",
        description: "· Вулканизированная смесь, полиуретан.<br>· Подшипниковый блок – низкоуглеродистая сталь, латунь, полимерные материалы: полиамид, полиэтилен, полистирол.<br>· Промежуточный вал - сталь.<br>· Шкивы - чугун.<br>· Импеллер - сталь.<br>· Статор - полиуретан.<br> ",
        image: img18 // Используем импортированное изображение
      },
      {
        name: "Пневмомеханические флотационные машины чанового типа",
        description: "· Вулканизированная смесь, полиуретан.<br>· Подшипниковый блок – низкоуглеродистая сталь, латунь, полимерные материалы: полиамид, полиэтилен, полистирол.<br>· Промежуточный вал - сталь.<br>· Шкивы - чугун.<br>· Импеллер - сталь.<br>· Статор - полиуретан.<br> ",
        image: img19 // Используем импортированное изображение
      },
      {
        name: "Колонные флотационные машины",
        description: "· Вулканизированная смесь, полиуретан.<br>· Подшипниковый блок – низкоуглеродистая сталь, латунь, полимерные материалы: полиамид, полиэтилен, полистирол.<br>· Промежуточный вал - сталь.<br>· Шкивы - чугун.<br>· Импеллер - сталь.<br>· Статор - полиуретан.<br> ",
        image: img43 // Используем импортированное изображение
      },
      {
        name: "Пенные флотационные машины",
        description: "· Вулканизированная смесь, полиуретан.<br>· Подшипниковый блок – низкоуглеродистая сталь, латунь, полимерные материалы: полиамид, полиэтилен, полистирол.<br>· Промежуточный вал - сталь.<br>· Шкивы - чугун.<br>· Импеллер - сталь.<br>· Статор - полиуретан.<br> ",
        image: img20 // Используем импортированное изображение
      },
      {
        name: "Пенные флотационные машины",
        description: "· Вулканизированная смесь, полиуретан.<br>· Подшипниковый блок – низкоуглеродистая сталь, латунь, полимерные материалы: полиамид, полиэтилен, полистирол.<br>· Промежуточный вал - сталь.<br>· Шкивы - чугун.<br>· Импеллер - сталь.<br>· Статор - полиуретан.<br> ",
        image: img21 // Используем импортированное изображение
      },
      {
        name: "Гидротранспортные системы",
        description: "· Вулканизированная смесь, полиуретан.<br>· Подшипниковый блок – низкоуглеродистая сталь, латунь, полимерные материалы: полиамид, полиэтилен, полистирол.<br>· Промежуточный вал - сталь.<br>· Шкивы - чугун.<br>· Импеллер - сталь.<br>· Статор - полиуретан.<br> ",
        image: img22 // Используем импортированное изображение
      },
      {
        name: "Смешивающий механизм FloatForce",
        description: "· Аэроузлы – сталь, резиновая вулканизированная смесь, полиуретан.<br>· Подшипниковый блок – низкоуглеродистая сталь, латунь, полимерные материалы: полиамид, полиэтилен, полистирол.<br>· Промежуточный вал - сталь.<br>· Шкивы - чугун.<br>· Импеллер - сталь.<br>· Статор - полиуретан.<br> ",
        image: img0 // Используем импортированное изображение
      },
      {
        name: "Флотомашины",
        description: "· Аэроузлы – сталь, резиновая вулканизированная смесь, полиуретан.<br>· Подшипниковый блок – низкоуглеродистая сталь, латунь, полимерные материалы: полиамид, полиэтилен, полистирол.<br>· Промежуточный вал - сталь.<br>· Шкивы - чугун.<br>· Импеллер - сталь.<br>· Статор - полиуретан.<br> ",
        image: img0 // Используем импортированное изображение
      },
      {
        name: "Фильтр Larox FFP3716»",
        description: "",
        image: img23 // Используем импортированное изображение
      },
      {
        name: "Гидроциклон Metso серии МНС»",
        description: "",
        image: img24 // Используем импортированное изображение
      },
      {
        name: "Пластинчатые сгустители IPS»",
        description: "",
        image: img25 // Используем импортированное изображение
      },
      {
        name: "Валковые прессы высокого давления»",
        description: "·  Валки разных типов - кованая легированная сталь<br>·  Дробящие плиты – высокомарганцевая сталь<br>·  Шестерни – углеродистая сталь, легированная сталь, алюминий.<br>·  Пластины – карбид вольфрама.<br>·  Бандажи - сталь.<br>·  Пружины - высокоуглеродистая сталь, легированная ванадием, марганцем и кремнием.<br> ",
        image: img26 // Используем импортированное изображение
      },
      {
        name: "Шаровые мельницы»",
        description: "·  Торцевые крышки – сплав стали.<br>·  Барабаны – чугун, сталь, резиновый материал.<br>·  Подшипники – низкоуглеродистая сталь, сталь с высоким содержанием молибдена, вольфрама, кремния, хрома, литые композиционные материалы.<br>·  Цапфы – высокопрочная сталь.<br>·  Бандажи - сталь.<br>·  Футеровка цапф – марганцевая сталь.<br> ",
        image: img27 // Используем импортированное изображение
      },
      {
        name: "Галечные мельницы»",
        description: "·  Торцевые крышки – сплав стали.<br>·  Барабаны – чугун, сталь, резиновый материал.<br>·  Подшипники – низкоуглеродистая сталь, сталь с высоким содержанием молибдена, вольфрама, кремния, хрома, литые композиционные материалы.<br>·  Цапфы – высокопрочная сталь.<br>·  Бандажи - сталь.<br>·  Футеровка цапф – марганцевая сталь.<br> ",
        image: img28 // Используем импортированное изображение
      },
      {
        name: "Мельницы полусамоизмельчения»",
        description: "·  Торцевые крышки – сплав стали.<br>·  Барабаны – чугун, сталь, резиновый материал.<br>·  Подшипники – низкоуглеродистая сталь, сталь с высоким содержанием молибдена, вольфрама, кремния, хрома, литые композиционные материалы.<br>·  Цапфы – высокопрочная сталь.<br>·  Бандажи - сталь.<br>·  Футеровка цапф – марганцевая сталь.<br> ",
        image: img29 // Используем импортированное изображение
      },
      {
        name: "Мельницы самоизмельчения»",
        description: "·  Торцевые крышки – сплав стали.<br>·  Барабаны – чугун, сталь, резиновый материал.<br>·  Подшипники – низкоуглеродистая сталь, сталь с высоким содержанием молибдена, вольфрама, кремния, хрома, литые композиционные материалы.<br>·  Цапфы – высокопрочная сталь.<br>·  Бандажи - сталь.<br>·  Футеровка цапф – марганцевая сталь.<br> ",
        image: img30 // Используем импортированное изображение
      },
      {
        name: "Мельницы с перемешиванием мелющей среды»",
        description: "",
        image: img31 // Используем импортированное изображение
      },
      {
        name: "Сгустители с периферическим приводом»",
        description: "",
        image: img32 // Используем импортированное изображение
      },
      {
        name: "Сгустители с центральным приводом»",
        description: "",
        image: img33 // Используем импортированное изображение
      },
      {
        name: "Радиальный сгуститель (дешламатор)»",
        description: "",
        image: img34 // Используем импортированное изображение
      },
      {
        name: "Дисковый вакуум-фильтр»",
        description: "",
        image: img35 // Используем импортированное изображение
      },
      {
        name: "Фильтр Larox CC»",
        description: "",
        image: img36 // Используем импортированное изображение
      },
      {
        name: "Пресс-фильтр Larox FP»",
        description: "",
        image: img37 // Используем импортированное изображение
      },
      {
        name: "Пресс-фильтр Larox PX»",
        description: "",
        image: img38 // Используем импортированное изображение
      },
      {
        name: "Фильтр RB»",
        description: "",
        image: img39 // Используем импортированное изображение
      },
      {
        name: "Мембранный пресс-фильтр Larox FFP»",
        description: "",
        image: img40 // Используем импортированное изображение
      },
      {
        name: "Фильтр SC»",
        description: "",
        image: img41 // Используем импортированное изображение
      },
      {
        name: "Фильтр FPS»",
        description: "",
        image: img42 // Используем импортированное изображение
      },
      {
        name: "Флотационная фабрика»",
        description: "",
        image: img0 // Используем импортированное изображение
      },
      {
        name: "Модульная мобильная фабрика cPlant»",
        description: "",
        image: img0 // Используем импортированное изображение
      },
      {
        name: "Смешивающий механизм FloatForce»",
        description: "",
        image: img0 // Используем импортированное изображение
      },
      {
        name: "Флотомашины»",
        description: "",
        image: img0 // Используем импортированное изображение
      },
      {
        name: "Скоростная флотация SkimAir»",
        description: "",
        image: img0 // Используем импортированное изображение
      },
];

const FloatingCard = React.forwardRef(({ setModalData }, ref) => {
  const [isRudaOpen, setIsRudaOpen] = useState(false);
  const [isSkladgaliOpen, setIsSkladgaliOpen] = useState(false);
  const [isDroblenieOpen, setIsDroblenieOpen] = useState(false);
  const [isDroblenie2Open, setIsDroblenie2Open] = useState(false);
  const [isIzmelchenieOpen, setIsIzmelchenieOpen] = useState(false);
  const [isGrohochenieOpen, setIsGrohochenieOpen] = useState(false);
  const [isKlassifikatsiyaOpen, setIsKlassifikatsiyaOpen] = useState(false);
  const [isKlassifikatsiya2Open, setIsKlassifikatsiya2Open] = useState(false);
  const [isKlassifikatsiya3Open, setIsKlassifikatsiya3Open] = useState(false);
  const [isPerechisnaya1Open, setIsPerechisnaya1Open] = useState(false);
  const [isPerechisnaya2Open, setIsPerechisnaya2Open] = useState(false);
  const [isOsnovnayaFlotatsiyaOpen, setIsOsnovnayaFlotatsiyaOpen] = useState(false);
  const [isKondicionirovanieOpen, setIsKondicionirovanieOpen] = useState(false);
  const [isKontrolnayaFlotatsiyaOpen, setIsKontrolnayaFlotatsiyaOpen] = useState(false);
  const [isOtvalnyeKhvostyOpen, setIsOtvalnyeKhvostyOpen] = useState(false);
  const [isDroizmelchenieOpen, setIsDroizmelchenieOpen] = useState(false);
  const [isSguschenieOpen, setIsSguschenieOpen] = useState(false);
  const [isFiltrovanieOpen, setIsFiltrovanieOpen] = useState(false);
  const [isSushkaOpen, setIsSushkaOpen] = useState(false);
  const [isSlivvotvalOpen, setIsSlivvotvalOpen] = useState(false);
  const [isMednikoncetratOpen, setIsMednikoncetratOpen] = useState(false);

  const [isOtkritiepoluvagoniVisible, setIsOtkritiepoluvagoniVisible] = useState(false);
  const [isHoveredRuda, setIsHoveredRuda] = useState(false);
  const [isHoveredSkladgali, setIsHoveredSkladgali] = useState(false);
  const [isSkladVisible, setIsSkladVisible] = useState(false);
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const [isAvtomobiliVisible, setIsAvtomobiliVisible] = useState(false);
  const [isHoveredDroblenie, setIsHoveredDroblenie] = useState(false);
  const [isHoveredDroblenie2, setIsHoveredDroblenie2] = useState(false);
  const [isHoveredIzmelchenie, setIsHoveredIzmelchenie] = useState(false);
  const [isHoveredGrohochenie, setIsHoveredGrohochenie] = useState(false);
  const [isHoveredKlassifikatsiya, setIsHoveredKlassifikatsiya] = useState(false);
  const [isHoveredKlassifikatsiya2, setIsHoveredKlassifikatsiya2] = useState(false);
  const [isHoveredKlassifikatsiya3, setIsHoveredKlassifikatsiya3] = useState(false);
  const [isHoveredPerechisnaya1, setIsHoveredPerechisnaya1] = useState(false);
  const [isHoveredPerechisnaya2, setIsHoveredPerechisnaya2] = useState(false);
  const [isHoveredOsnovnayaFlotatsiya, setIsHoveredOsnovnayaFlotatsiya] = useState(false);
  const [isHoveredKondicionirovanie, setIsHoveredKondicionirovanie] = useState(false);
  const [isHoveredKontrolnayaFlotatsiya, setIsHoveredKontrolnayaFlotatsiya] = useState(false);
  const [isHoveredOtvalnyeKhvosty, setIsHoveredOtvalnyeKhvosty] = useState(false);
  const [isHoveredDroizmelchenie, setIsHoveredDroizmelchenie] = useState(false);
  const [isHoveredSguschenie, setIsHoveredSguschenie] = useState(false);
  const [isHoveredFiltrovanie, setIsHoveredFiltrovanie] = useState(false);
  const [isHoveredSushka, setIsHoveredSushka] = useState(false);
  const [isHoveredSlivvotval, setIsHoveredSlivvotval] = useState(false);
  const [isHoveredMednikoncetrat, setIsHoveredMednikoncetrat] = useState(false);
  const [currentArrowImage, setCurrentArrowImage] = useState(arrowImage);

  const klassifikatsiya2Ref = useRef(null);
  const klassifikatsiya3Ref = useRef(null);
  const perechisnaya1Ref = useRef(null);
  const rudaRef = useRef(null);
  const skladgaliRef = useRef(null);
  const sushkaRef = useRef(null);
  const slivvotvalRef = useRef(null);
  const mednikoncetratRef = useRef(null);

  const handleDroblenieClick = (e) => {
    e.stopPropagation();
    setIsDroblenieOpen(!isDroblenieOpen);
    setIsAvtomobiliVisible(!isDroblenieOpen);
    setIsOtkritiepoluvagoniVisible(!isDroblenieOpen);
    setIsSkladVisible(!isDroblenieOpen);
    setIsInfoVisible(!isDroblenieOpen);
    setCurrentArrowImage(isDroblenieOpen ? arrowImage : arrowHoverImage);
  };

  const handleGrohochenieClick = (e) => {
    e.stopPropagation();
    setIsGrohochenieOpen(!isGrohochenieOpen);
  };

  const handleRudaClick = () => {
    setIsRudaOpen(!isRudaOpen);
  };

  const handleSkladgaliClick = () => {
    setIsSkladgaliOpen(!isSkladgaliOpen);
  };
  
  const handleIzmelchenieClick = (e) => {
    e.stopPropagation();
    setIsIzmelchenieOpen(!isIzmelchenieOpen);
  };

  const handleDroblenie2Click = (e) => {
    e.stopPropagation();
    setIsDroblenie2Open(!isDroblenie2Open);
  };

  const handleOsnovnayaFlotatsiyaClick = (e) => {
    e.stopPropagation();
    setIsOsnovnayaFlotatsiyaOpen(!isOsnovnayaFlotatsiyaOpen);
  };

  const handleKlassifikatsiyaClick = (e) => {
    e.stopPropagation();
    setIsKlassifikatsiyaOpen(!isKlassifikatsiyaOpen);
  };

  const handleKlassifikatsiya2Click = () => {
    setIsKlassifikatsiya2Open(!isKlassifikatsiya2Open);
  };

  const handleKlassifikatsiya3Click = () => {
    setIsKlassifikatsiya2Open(!isKlassifikatsiya3Open);
  };

  const handlePerechisnaya1Click = () => {
    setIsPerechisnaya1Open(!isPerechisnaya1Open);
  };

  const handlePerechisnaya2Click = () => {
    setIsPerechisnaya2Open(!isPerechisnaya2Open);
  };

  const handleKontrolnayaFlotatsiyaClick = () => {
    setIsKontrolnayaFlotatsiyaOpen(!isKontrolnayaFlotatsiyaOpen);
  };

  const handleKondicionirovanieClick = () => {
    setIsKondicionirovanieOpen(!isKondicionirovanieOpen);
  };

  const handleOtvalnyeKhvostyClick = () => {
    setIsOtvalnyeKhvostyOpen(!isOtvalnyeKhvostyOpen);
  };

  const handleDroizmelchenieClick = () => {
    setIsDroizmelchenieOpen(!isDroizmelchenieOpen);
  };

  const handleSguschenieClick = () => {
    setIsSguschenieOpen(!isSguschenieOpen);
  };

  const handleFiltrovanieClick = () => {
    setIsFiltrovanieOpen(!isFiltrovanieOpen);
  };

  const handleSushkaClick = () => {
    setIsSushkaOpen(!isSushkaOpen);
  };

  const handleMednikoncetratClick = () => {
    setIsMednikoncetratOpen(!isMednikoncetratOpen);
  };

  const handleSlivvotvalClick = () => {
    setIsSlivvotvalOpen(!isSlivvotvalOpen);
  };


  const handleDropdownItemClick = (itemName, e) => {
    e.stopPropagation();
    const selectedData = excelData.find(data => data.name === itemName);
    if (!selectedData) return;
  
    if (!selectedData.description) {
      selectedData.description = "Описание отсутствует";
    }
  
    setModalData(selectedData);
  };

  return (
    <div className={styles.carta_flot} ref={ref}>
      <img className={styles.fon} src={fonImage} alt="Background" />
      <img className={styles.arrow} src={currentArrowImage} alt="Arrow" />
  
      {/* Блок "Руда" */}
      <div
        className={styles.blok_ruda}
        onMouseEnter={() => setIsHoveredRuda(true)}
        onMouseLeave={() => setIsHoveredRuda(false)}
        ref={rudaRef}
      >
        <div className={styles.ruda} onClick={handleRudaClick}>
          <img
            className={styles.img_ruda}
            src={isHoveredRuda ? rudaHoverImage : rudaImage}
            alt="Руда"
          />
        </div>
  
        <div className={styles.context_menu} onClick={handleRudaClick}>
          <div className={styles.menu_container}>
            <div className={styles.menu_text}>Руда</div>
          </div>
        </div>
      </div>
  
      {/* Блок "Склад гали" */}
      <div
        className={styles.blok_skladgali}
        onMouseEnter={() => setIsHoveredSkladgali(true)}
        onMouseLeave={() => setIsHoveredSkladgali(false)}
        ref={skladgaliRef}
      >
        <div className={styles.skladgali} onClick={handleSkladgaliClick}>
          <img
            className={styles.img_skladgali}
            src={isHoveredSkladgali ? skladgaliHoverImage : skladgaliImage}
            alt="Склад гали"
          />
        </div>
  
        <div className={styles.context_menu} onClick={handleSkladgaliClick}>
          <div className={styles.menu_container}>
            <div className={styles.menu_text}>Склад гали</div>
          </div>
        </div>
      </div>
  
      {/* Блок "Дробление" */}
      <div
        className={styles.blok_droblenie}
        onMouseEnter={() => setIsHoveredDroblenie(true)}
        onMouseLeave={() => setIsHoveredDroblenie(false)}
      >
        <div className={styles.droblenie} onClick={handleDroblenieClick}>
          <img
            className={styles.img_droblenie2}
            src={isHoveredDroblenie ? droblenieHoverImage : droblenieImage}
            alt="Дробление"
          />
        </div>
  
        <div className={styles.context_menu} onClick={handleDroblenieClick}>
          <div className={styles.menu_container}>
            <div className={styles.menu_text}>Дробление</div>
            <img className={styles.vector_icon} src={vectorImage} alt="Иконка" />
          </div>
        </div>
  
        {isDroblenieOpen && (
          <div 
            className={styles.dropdown_list} 
            onMouseLeave={() => setIsDroblenieOpen(false)}
            onClick={(e) => e.stopPropagation()}
          >
            {excelData.slice(0, 4).map((item, index) => (
              <div
                key={index}
                className={styles.dropdown_item}
                onClick={(e) => handleDropdownItemClick(item.name, e)}
              >
                {item.name}
              </div>
            ))}
          </div>
        )}
      </div>
  
      {/* Блок "Дробление 2" */}
      <div
        className={styles.blok_droblenie2}
        onMouseEnter={() => setIsHoveredDroblenie2(true)}
        onMouseLeave={() => setIsHoveredDroblenie2(false)}
      >
        <div className={styles.droblenie2} onClick={handleDroblenie2Click}>
          <img
            className={styles.img_droblenie2}
            src={isHoveredDroblenie2 ? droblenie2HoverImage : droblenie2Image}
            alt="Дробление"
          />
        </div>
  
        <div className={styles.context_menu} onClick={handleDroblenie2Click}>
          <div className={styles.menu_container}>
            <div className={styles.menu_text}>Дробление</div>
            <img className={styles.vector_icon} src={vectorImage} alt="Иконка" />
          </div>
        </div>
  
        {isDroblenie2Open && (
          <div 
            className={styles.dropdown_list} 
            onMouseLeave={() => setIsDroblenie2Open(false)}
            onClick={(e) => e.stopPropagation()}
          >
            {excelData.slice(1, 4).map((item, index) => (
              <div
                key={index}
                className={styles.dropdown_item}
                onClick={(e) => handleDropdownItemClick(item.name, e)}
              >
                {item.name}
              </div>
            ))}
          </div>
        )}
      </div>
  
      {/* Блок "Измельчение" */}
      <div
        className={styles.blok_izmelchenie}
        onMouseEnter={() => setIsHoveredIzmelchenie(true)}
        onMouseLeave={() => setIsHoveredIzmelchenie(false)}
      >
        <div className={styles.izmelchenie} onClick={handleIzmelchenieClick}>
          <img
            className={styles.img_izmelchenie1}
            src={isHoveredIzmelchenie ? izmelchenieHoverImage : izmelchenieImage}
            alt="Измельчение"
          />
        </div>
  
        <div className={styles.context_menu} onClick={handleIzmelchenieClick}>
          <div className={styles.menu_container}>
            <div className={styles.menu_text}>Измельчение</div>
            <img className={styles.vector_icon} src={vectorImage} alt="Иконка" />
          </div>
        </div>
  
        {isIzmelchenieOpen && (
          <div 
            className={styles.dropdown_list} 
            onMouseLeave={() => setIsIzmelchenieOpen(false)}
            onClick={(e) => e.stopPropagation()}
          >
            {excelData.slice(4, 10).map((item, index) => (
              <div
                key={index}
                className={styles.dropdown_item}
                onClick={(e) => handleDropdownItemClick(item.name, e)}
              >
                {item.name}
              </div>
            ))}
          </div>
        )}
      </div>
  
      {/* Блок "Грохочение" */}
      <div
        className={styles.blok_grohochenie}
        onMouseEnter={() => setIsHoveredGrohochenie(true)}
        onMouseLeave={() => setIsHoveredGrohochenie(false)}
      >
        <div className={styles.grohocheni} onClick={handleGrohochenieClick}>
          <img
            className={styles.img_grohocheni}
            src={isHoveredGrohochenie ? grohochenieHoverImage : grohochenieImage}
            alt="Грохочение"
          />
        </div>
  
        <div className={styles.context_menu} onClick={handleGrohochenieClick}>
          <div className={styles.menu_container}>
            <div className={styles.menu_text}>Грохочение</div>
            <img className={styles.vector_icon} src={vectorImage} alt="Иконка" />
          </div>
        </div>
  
        {isGrohochenieOpen && (
          <div 
            className={styles.dropdown_list} 
            onMouseLeave={() => setIsGrohochenieOpen(false)}
            onClick={(e) => e.stopPropagation()}
          >
            {excelData.slice(10, 15).map((item, index) => (
              <div
                key={index}
                className={styles.dropdown_item}
                onClick={(e) => handleDropdownItemClick(item.name, e)}
              >
                {item.name}
              </div>
            ))}
          </div>
        )}
      </div>
  
      {/* Блок "Классификация" */}
      <div
        className={styles.blok_klassifikatsiya}
        onMouseEnter={() => setIsHoveredKlassifikatsiya(true)}
        onMouseLeave={() => setIsHoveredKlassifikatsiya(false)}
      >
        <div className={styles.klassifikatsiya} onClick={handleKlassifikatsiyaClick}>
          <img
            className={styles.img_klassifikatsiya}
            src={isHoveredKlassifikatsiya ? klassifikatsiyaHoverImage : klassifikatsiyaImage}
            alt="Классификация"
          />
        </div>
  
        <div className={styles.context_menu} onClick={handleKlassifikatsiyaClick}>
          <div className={styles.menu_container}>
            <div className={styles.menu_text}>Классификация</div>
            <img className={styles.vector_icon} src={vectorImage} alt="Иконка" />
          </div>
        </div>
  
        {isKlassifikatsiyaOpen && (
          <div 
            className={styles.dropdown_list} 
            onMouseLeave={() => setIsKlassifikatsiyaOpen(false)}
            onClick={(e) => e.stopPropagation()}
          >
            {excelData.slice(15, 22).map((item, index) => (
              <div
                key={index}
                className={styles.dropdown_item}
                onClick={(e) => handleDropdownItemClick(item.name, e)}
              >
                {item.name}
              </div>
            ))}
          </div>
        )}
      </div>
  
      {/* Блок "Классификация2" */}
      <div
        className={styles.blok_klassifikatsiya2}
        onMouseEnter={() => setIsHoveredKlassifikatsiya2(true)}
        onMouseLeave={() => setIsHoveredKlassifikatsiya2(false)}
        ref={klassifikatsiya2Ref}
      >
        <div className={styles.skladgali} onClick={handleKlassifikatsiya2Click}>
          <img
            className={styles.img_klassifikatsiya2}
            src={isHoveredKlassifikatsiya2 ? klassifikatsiya2HoverImage : klassifikatsiya2Image}
            alt="Классификация2"
          />
        </div>
  
        <div className={styles.context_menu} onClick={handleKlassifikatsiya2Click}>
          <div className={styles.menu_container}>
            <div className={styles.menu_text}>Классификация</div>
          </div>
        </div>
      </div>
  
      {/* Блок "Основная флотация" */}
      <div
        className={styles.blok_osnovnayaFlotatsiya}
        onMouseEnter={() => setIsHoveredOsnovnayaFlotatsiya(true)}
        onMouseLeave={() => setIsHoveredOsnovnayaFlotatsiya(false)}
      >
        <div className={styles.osnovnayaFlotatsiya} onClick={handleOsnovnayaFlotatsiyaClick}>
          <img
            className={styles.img_osnovnayaFlotatsiya}
            src={isHoveredOsnovnayaFlotatsiya ? osnovnayaFlotatsiyaHoverImage : osnovnayaFlotatsiyaImage}
            alt="Основная флотация"
          />
        </div>
  
        <div className={styles.context_menu} onClick={handleOsnovnayaFlotatsiyaClick}>
          <div className={styles.menu_container}>
            <div className={styles.menu_text}>Основная флотация</div>
            <img className={styles.vector_icon} src={vectorImage} alt="Иконка" />
          </div>
        </div>
  
        {isOsnovnayaFlotatsiyaOpen && (
          <div 
            className={styles.dropdown_list} 
            onMouseLeave={() => setIsOsnovnayaFlotatsiyaOpen(false)}
            onClick={(e) => e.stopPropagation()}
          >
            {excelData.slice(54, 60).map((item, index) => (
              <div
                key={index}
                className={styles.dropdown_item}
                onClick={(e) => handleDropdownItemClick(item.name, e)}
              >
                {item.name}
              </div>
            ))}
          </div>
        )}
      </div>
  
      {/* Блок "Кондицилонирование" */}
      <div
        className={styles.blok_kondicionirovanie}
        onMouseEnter={() => setIsHoveredKondicionirovanie(true)}
        onMouseLeave={() => setIsHoveredKondicionirovanie(false)}
      >
        <div className={styles.kondicionirovanie} onClick={handleKondicionirovanieClick}>
          <img
            className={styles.img_kondicionirovanie}
            src={isHoveredKondicionirovanie ? kondicionirovanieHoverImage : kondicionirovanieImage}
            alt="Кондицилонирование"
          />
        </div>
  
        <div className={styles.context_menu} onClick={handleKondicionirovanieClick}>
          <div className={styles.menu_container}>
            <div className={styles.menu_text}>Кондицилонирование</div>
            <img className={styles.vector_icon} src={vectorImage} alt="Иконка" />
          </div>
        </div>
  
        {isKondicionirovanieOpen && (
          <div 
            className={styles.dropdown_list} 
            onMouseLeave={() => setIsKondicionirovanieOpen(false)}
            onClick={(e) => e.stopPropagation()}
          >
            {excelData.slice(23, 33).map((item, index) => (
              <div
                key={index}
                className={styles.dropdown_item}
                onClick={(e) => handleDropdownItemClick(item.name, e)}
              >
                {item.name}
              </div>
            ))}
          </div>
        )}
      </div>
  
      {/* Блок "Контрольная флотация" */}
      <div
        className={styles.blok_kontrolnayaFlotatsiya}
        onMouseEnter={() => setIsHoveredKontrolnayaFlotatsiya(true)}
        onMouseLeave={() => setIsHoveredKontrolnayaFlotatsiya(false)}
      >
        <div className={styles.kontrolnayaFlotatsiya} onClick={handleKontrolnayaFlotatsiyaClick}>
          <img
            className={styles.img_kontrolnayaFlotatsiya}
            src={isHoveredKontrolnayaFlotatsiya ? kontrolnayaFlotatsiyaHoverImage : kontrolnayaFlotatsiyaImage}
            alt="Контрольная флотация"
          />
        </div>
  
        <div className={styles.context_menu} onClick={handleKontrolnayaFlotatsiyaClick}>
          <div className={styles.menu_container}>
            <div className={styles.menu_text}>Контрольная флотация</div>
            <img className={styles.vector_icon} src={vectorImage} alt="Иконка" />
          </div>
        </div>
  
        {isKontrolnayaFlotatsiyaOpen && (
          <div 
            className={styles.dropdown_list} 
            onMouseLeave={() => setIsKontrolnayaFlotatsiyaOpen(false)}
            onClick={(e) => e.stopPropagation()}
          >
            {excelData.slice(54, 60).map((item, index) => (
              <div
                key={index}
                className={styles.dropdown_item}
                onClick={(e) => handleDropdownItemClick(item.name, e)}
              >
                {item.name}
              </div>
            ))}
          </div>
        )}
      </div>
  
      {/* Блок "Классификация3" */}
      <div
        className={styles.blok_klassifikatsiya3}
        onMouseEnter={() => setIsHoveredKlassifikatsiya3(true)}
        onMouseLeave={() => setIsHoveredKlassifikatsiya3(false)}
        ref={klassifikatsiya3Ref}
      >
        <div className={styles.skladgali} onClick={handleKlassifikatsiya3Click}>
          <img
            className={styles.img_klassifikatsiya3}
            src={isHoveredKlassifikatsiya3 ? klassifikatsiya3HoverImage : klassifikatsiya3Image}
            alt="Классификация3"
          />
        </div>
  
        <div className={styles.context_menu} onClick={handleKlassifikatsiya3Click}>
          <div className={styles.menu_container}>
            <div className={styles.menu_text}>Классификация</div>
          </div>
        </div>
      </div>
  
      {/* Блок "1 перечистная" */}
      <div
        className={styles.blok_perechisnaya1}
        onMouseEnter={() => setIsHoveredPerechisnaya1(true)}
        onMouseLeave={() => setIsHoveredPerechisnaya1(false)}
        ref={perechisnaya1Ref}
      >
        <div className={styles.perechisnaya1} onClick={handlePerechisnaya1Click}>
          <img
            className={styles.img_perechisnaya1}
            src={isHoveredPerechisnaya1 ? perechisnaya1HoverImage : perechisnaya1Image}
            alt="1 перечистная"
          />
        </div>
  
        <div className={styles.context_menu} onClick={handlePerechisnaya1Click}>
          <div className={styles.menu_container}>
            <div className={styles.menu_text}>1 перечистная</div>
          </div>
        </div>
      </div>
  
      {/* Блок "2 перечистная" */}
      <div
        className={styles.blok_perechisnaya2}
        onMouseEnter={() => setIsHoveredPerechisnaya2(true)}
        onMouseLeave={() => setIsHoveredPerechisnaya2(false)}
        ref={perechisnaya1Ref}
      >
        <div className={styles.perechisnaya2} onClick={handlePerechisnaya2Click}>
          <img
            className={styles.img_perechisnaya2}
            src={isHoveredPerechisnaya2 ? perechisnaya2HoverImage : perechisnaya2Image}
            alt="2 перечистная"
          />
        </div>
  
        <div className={styles.context_menu} onClick={handlePerechisnaya2Click}>
          <div className={styles.menu_container}>
            <div className={styles.menu_text}>2 перечистная</div>
          </div>
        </div>
      </div>
  
      {/* Блок "Отвальные хвосты" */}
      <div
        className={styles.blok_otvalnyeKhvosty}
        onMouseEnter={() => setIsHoveredOtvalnyeKhvosty(true)}
        onMouseLeave={() => setIsHoveredOtvalnyeKhvosty(false)}
      >
        <div className={styles.otvalnyeKhvosty} onClick={handleOtvalnyeKhvostyClick}>
          <img
            className={styles.img_otvalnyeKhvost}
            src={isHoveredOtvalnyeKhvosty ? otvalnyeKhvostyHoverImage : otvalnyeKhvostyImage}
            alt="Отвальные хвосты"
          />
        </div>
  
        <div className={styles.context_menu} onClick={handleOtvalnyeKhvostyClick}>
          <div className={styles.menu_container}>
            <div className={styles.menu_text}>Отвальные хвосты</div>
            <img className={styles.vector_icon} src={vectorImage} alt="Иконка" />
          </div>
        </div>
  
        {isOtvalnyeKhvostyOpen && (
          <div 
            className={styles.dropdown_list} 
            onMouseLeave={() => setIsOtvalnyeKhvostyOpen(false)}
            onClick={(e) => e.stopPropagation()}
          >
            {excelData.slice(33, 36).map((item, index) => (
              <div
                key={index}
                className={styles.dropdown_item}
                onClick={(e) => handleDropdownItemClick(item.name, e)}
              >
                {item.name}
              </div>
            ))}
          </div>
        )}
      </div>
  
      {/* Блок "Диизмельчение" */}
      <div
        className={styles.blok_droizmelchenie}
        onMouseEnter={() => setIsHoveredDroizmelchenie(true)}
        onMouseLeave={() => setIsHoveredDroizmelchenie(false)}
      >
        <div className={styles.droizmelchenie} onClick={handleDroizmelchenieClick}>
          <img
            className={styles.img_droizmelchenie}
            src={isHoveredDroizmelchenie ? droizmelchenieHoverImage : droizmelchenieImage}
            alt="Диизмельчение"
          />
        </div>
  
        <div className={styles.context_menu} onClick={handleDroizmelchenieClick}>
          <div className={styles.menu_container}>
            <div className={styles.menu_text}>Диизмельчение</div>
            <img className={styles.vector_icon} src={vectorImage} alt="Иконка" />
          </div>
        </div>
  
        {isDroizmelchenieOpen && (
          <div 
            className={styles.dropdown_list} 
            onMouseLeave={() => setIsDroizmelchenieOpen(false)}
            onClick={(e) => e.stopPropagation()}
          >
            {excelData.slice(36, 41).map((item, index) => (
              <div
                key={index}
                className={styles.dropdown_item}
                onClick={(e) => handleDropdownItemClick(item.name, e)}
              >
                {item.name}
              </div>
            ))}
          </div>
        )}
      </div>
  
      {/* Блок "Сгущение" */}
      <div
        className={styles.blok_sguschenie}
        onMouseEnter={() => setIsHoveredSguschenie(true)}
        onMouseLeave={() => setIsHoveredSguschenie(false)}
      >
        <div className={styles.sguschenie} onClick={handleSguschenieClick}>
          <img
            className={styles.img_droizmelchenie}
            src={isHoveredSguschenie ? sguschenieHoverImage : sguschenieImage}
            alt="Сгущение"
          />
        </div>
  
        <div className={styles.context_menu} onClick={handleSguschenieClick}>
          <div className={styles.menu_container}>
            <div className={styles.menu_text}>Сгущение</div>
            <img className={styles.vector_icon} src={vectorImage} alt="Иконка" />
          </div>
        </div>
  
        {isSguschenieOpen && (
          <div 
            className={styles.dropdown_list} 
            onMouseLeave={() => setIsSguschenieOpen(false)}
            onClick={(e) => e.stopPropagation()}
          >
            {excelData.slice(42, 46).map((item, index) => (
              <div
                key={index}
                className={styles.dropdown_item}
                onClick={(e) => handleDropdownItemClick(item.name, e)}
              >
                {item.name}
              </div>
            ))}
          </div>
        )}
      </div>
  
      {/* Блок "Фильтрование" */}
      <div
        className={styles.blok_filtrovanie}
        onMouseEnter={() => setIsHoveredFiltrovanie(true)}
        onMouseLeave={() => setIsHoveredFiltrovanie(false)}
      >
        <div className={styles.filtrovanie} onClick={handleFiltrovanieClick}>
          <img
            className={styles.img_filtrovanie}
            src={isHoveredFiltrovanie ? filtrovanieHoverImage : filtrovanieImage}
            alt="Фильтрование"
          />
        </div>
  
        <div className={styles.context_menu} onClick={handleFiltrovanieClick}>
          <div className={styles.menu_container}>
            <div className={styles.menu_text}>Фильтрование</div>
            <img className={styles.vector_icon} src={vectorImage} alt="Иконка" />
          </div>
        </div>
  
        {isFiltrovanieOpen && (
          <div 
            className={styles.dropdown_list} 
            onMouseLeave={() => setIsFiltrovanieOpen(false)}
            onClick={(e) => e.stopPropagation()}
          >
            {excelData.slice(46, 54).map((item, index) => (
              <div
                key={index}
                className={styles.dropdown_item}
                onClick={(e) => handleDropdownItemClick(item.name, e)}
              >
                {item.name}
              </div>
            ))}
          </div>
        )}
      </div>
  
      {/* Блок "Сушка" */}
      <div
        className={styles.blok_sushka}
        onMouseEnter={() => setIsHoveredSushka(true)}
        onMouseLeave={() => setIsHoveredSushka(false)}
        ref={sushkaRef}
      >
        <div className={styles.sushka} onClick={handleSushkaClick}>
          <img
            className={styles.img_sushka}
            src={isHoveredSushka ? sushkaHoverImage : sushkaImage}
            alt="Сушка"
          />
        </div>
  
        <div className={styles.context_menu} onClick={handleSushkaClick}>
          <div className={styles.menu_container}>
            <div className={styles.menu_text}>Сушка</div>
          </div>
        </div>
      </div>
  
      {/* Блок "Слив в отвал" */}
      <div
        className={styles.blok_slivvotval}
        onMouseEnter={() => setIsHoveredSlivvotval(true)}
        onMouseLeave={() => setIsHoveredSlivvotval(false)}
        ref={slivvotvalRef}
      >
        <div className={styles.slivvotval} onClick={handleSlivvotvalClick}>
          <img
            className={styles.img_slivvotval}
            src={isHoveredSlivvotval ? slivvotvalHoverImage : slivvotvalImage}
            alt="Слив в отвал"
          />
        </div>
  
        <div className={styles.context_menu} onClick={handleSlivvotvalClick}>
          <div className={styles.menu_container}>
            <div className={styles.menu_text}>Слив в отвал</div>
          </div>
        </div>
      </div>
  
      {/* Блок "Медный концентрат" */}
      <div
        className={styles.blok_mednikoncetrat}
        onMouseEnter={() => setIsHoveredMednikoncetrat(true)}
        onMouseLeave={() => setIsHoveredMednikoncetrat(false)}
        ref={mednikoncetratRef}
      >
        <div className={styles.mednikoncetrat} onClick={handleMednikoncetratClick}>
          <img
            className={styles.img_mednikoncetrat}
            src={isHoveredMednikoncetrat ? mednikoncetratHoverImage : mednikoncetratImage}
            alt="Медный концентрат"
          />
        </div>
  
        <div className={styles.context_menu} onClick={handleMednikoncetratClick}>
          <div className={styles.menu_container}>
            <div className={styles.menu_text}>Медный концентрат</div>
          </div>
        </div>
      </div>
  
      {/* Остальные блоки */}

      {isInfoVisible && (
        <div className={styles.blok_info}>
          <div className={styles.info}>
            <img className={styles.img_info} src={infoImage} alt="info" />
          </div>
        </div>
      )}

      {isAvtomobiliVisible && (
        <div className={styles.blok_avtomobili}>
          <div className={styles.avtomobili}>
            <img className={styles.img_avtomobili1} src={avtomobiliImage} alt="Автомобили" />
          </div>
          <div className={styles.context_menu}>
            <div className={styles.menu_container}>
              <div className={styles.menu_text}>Автомобили</div>
            </div>
          </div>
        </div>
      )}
  
      {isOtkritiepoluvagoniVisible && (
        <div className={styles.blok_otkritiepoluvagoni}>
          <div className={styles.otkritiepoluvagoni}>
            <img className={styles.img_otkritiepoluvagoni} src={otkritiepoluvagoniImage} alt="Открытые полувагоны" />
          </div>
          <div className={styles.context_menu}>
            <div className={styles.menu_container}>
              <div className={styles.menu_text}>Открытые полувагоны</div>
            </div>
          </div>
        </div>
      )}
  
      {isSkladVisible && (
        <div className={styles.blok_sklad}>
          <div className={styles.sklad}>
            <img className={styles.img_sklad} src={skladImage} alt="Склад" />
          </div>
          <div className={styles.context_menu}>
            <div className={styles.menu_container}>
              <div className={styles.menu_text}>Склад</div>
            </div>
          </div>
        </div>
      )}
    </div>
   );
  });

export default FloatingCard;