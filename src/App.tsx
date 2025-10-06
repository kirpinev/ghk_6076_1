import { ButtonMobile } from "@alfalab/core-components/button/mobile";

import { Typography } from "@alfalab/core-components/typography";

import image1 from "./assets/image1.png";
import image2 from "./assets/image2.png";
import image3 from "./assets/image3.png";
import { LS, LSKeys } from "./ls";
import { appSt } from "./style.css";
import { Gap } from "@alfalab/core-components/gap";
import { FormEvent, useState } from "react";
import { BottomSheet } from "@alfalab/core-components/bottom-sheet";
import { ThxLayout } from "./thx/ThxLayout.tsx";
import { Textarea } from "@alfalab/core-components/textarea";

export const App = () => {
  const [thxShow, setThx] = useState(LS.getItem(LSKeys.ShowThx, false));
  const [isMoreClicked, setIsMoreClicked] = useState(false);
  const [value, setValue] = useState("");
  const [isError, setIsError] = useState(false);
  const [label, setLabel] = useState("Хочу покорить Эверест через год.");
  const [loading, setLoading] = useState(false);

  const submit = () => {
    setLoading(true);

    Promise.resolve().then(() => {
      setLoading(false);
      LS.setItem(LSKeys.ShowThx, true);
      setThx(true);
    });
  };

  if (thxShow) {
    return <ThxLayout />;
  }

  return (
    <>
      <div className={appSt.container}>
        <img
          src={image1}
          alt="Картинка Альфа-Смарт"
          style={{ borderRadius: "16px" }}
        />

        <Gap size={8} />

        <Typography.Title tag="h1" view="small" weight="bold">
          +1 барабан кэшбэка за первую покупку ребёнка
        </Typography.Title>

        <Gap size={16} />

        <Typography.Text>
          За первую оплату детской картой — ребёнок получит кэшбэк до 100%
        </Typography.Text>

        <Gap size={32} />

        <Typography.Title tag="h1" view="xsmall" weight="bold">
          Как получить
        </Typography.Title>

        <Gap size={16} />

        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <img src={image2} alt="" width={48} height={48} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Typography.Text view="primary-small">
              Ребёнку нужно оплатить покупку
            </Typography.Text>
            <Typography.Text color="secondary" view="primary-small">
              Своей картой и на любую сумму — в магазине, онлайн или через
              приложение
            </Typography.Text>
          </div>
        </div>

        <Gap size={32} />

        <Typography.Title tag="h1" view="xsmall" weight="bold">
          Подарок ребёнку
        </Typography.Title>

        <Gap size={16} />

        <div
          style={{
            display: "flex",
            gap: "16px",
            alignItems: "center",
            padding: "16px",
            borderRadius: "26px",
            border: "2px solid #F8F8F8",
          }}
        >
          <img src={image3} alt="" width={70} height={70} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Typography.Text view="primary-medium" weight="bold">
              Барабан кэшбэка от Вкусно и Точка
            </Typography.Text>
            <Gap size={4} />
            <Typography.Text color="secondary" view="primary-medium">
              Кэшбэк до 100%
            </Typography.Text>
          </div>
        </div>
      </div>

      <Gap size={96} />

      <div className={appSt.bottomBtn}>
        <ButtonMobile
          block
          view="primary"
          href="alfabank://longread?endpoint=v1/adviser/longreads/67708"
        >
          Хотим участвовать!
        </ButtonMobile>
      </div>

      <BottomSheet
        open={isMoreClicked}
        onClose={() => setIsMoreClicked(false)}
        actionButton={
          <ButtonMobile
            block
            loading={loading}
            view="primary"
            href=""
            onClick={() => {
              if (value.length === 0) {
                setIsError(true);
              } else {
                setIsError(false);
                submit();
              }
            }}
          >
            Продолжить
          </ButtonMobile>
        }
      >
        <Gap size={8} />
        <Typography.TitleResponsive
          tag="h1"
          view="medium"
          font="system"
          weight="bold"
          style={{ textAlign: "center" }}
        >
          Расскажите о себе и вашей цели
        </Typography.TitleResponsive>
        <Gap size={16} />

        <Textarea
          value={value}
          onInput={(e: FormEvent<HTMLTextAreaElement>) => {
            const input = e.target as HTMLInputElement;

            setValue(input.value);
          }}
          onClick={() => setLabel("")}
          onBlur={() => {
            if (value.length !== 0) {
              setLabel("");
            } else {
              setLabel("Хочу покорить Эверест через год. Поможешь?");
            }
          }}
          label={label}
          block={true}
          minRows={10}
          maxLength={500}
          showCounter={true}
        />
        <Gap size={8} />
        {isError && (
          <Typography.Text
            view="primary-medium"
            color="negative"
            style={{ textAlign: "center" }}
          >
            Заполните, чтобы получить план для цели
          </Typography.Text>
        )}
      </BottomSheet>
    </>
  );
};
