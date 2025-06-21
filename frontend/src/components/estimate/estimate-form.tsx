"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Car } from "lucide-react";

interface QuotationItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
  distance?: string;
}

export default function EstimateForm() {
  const [quotationDate, setQuotationDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [quotationNumber, setQuotationNumber] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [companyName, setCompanyName] = useState("○○株式会社");
  const [companyAddress, setCompanyAddress] = useState(
    "川崎市川崎区○○○番地\n○○ステーション内"
  );
  const [postalCode, setPostalCode] = useState("000-3216");
  const [companyPhone, setCompanyPhone] = useState("044-222-3333");
  const [companyManager, setCompanyManager] = useState("山田 太郎");
  const [validityPeriod, setValidityPeriod] = useState("見積日より1ヶ月間");
  const [deliveryPeriod, setDeliveryPeriod] = useState("発注日より○○日");
  const [taxCost, setTaxCost] = useState("");

  const [productName, setProductName] = useState("パスタ・乾麺（産廃）");
  const [loadingLocation, setLoadingLocation] = useState("○○倉庫");
  const [paymentTerms, setPaymentTerms] = useState("月末締め翌月末払い");
  const [transportContent, setTransportContent] =
    useState("ダンプトラクター（20F3軸）");
  const [unloadingLocation, setUnloadingLocation] = useState("金沢区○○");
  const [quoteValidity, setQuoteValidity] = useState("発行日より3ヵ月");

  const [items, setItems] = useState<QuotationItem[]>([
    {
      id: "1",
      description: "○○倉庫～金沢区○○",
      quantity: 1,
      unitPrice: 62000,
      amount: 62000,
      distance: "50",
    },
    {
      id: "2",
      description: "積地：横浜市鶴見区○○",
      quantity: 0,
      unitPrice: 0,
      amount: 0,
    },
    {
      id: "3",
      description: "卸地：横浜市金沢区○○",
      quantity: 0,
      unitPrice: 0,
      amount: 0,
    },
    {
      id: "4",
      description: "",
      quantity: 0,
      unitPrice: 0,
      amount: 0,
    },
    {
      id: "5",
      description: "燃料価格調整金 ※2025年6月",
      quantity: 22.7,
      unitPrice: 57.3,
      amount: 1301,
    },
    {
      id: "6",
      description: "※算出 50（km)÷2.2（車両明細）＝22.7ℓ",
      quantity: 0,
      unitPrice: 0,
      amount: 0,
    },
  ]);

  const addItem = () => {
    const newItem: QuotationItem = {
      id: Date.now().toString(),
      description: "",
      quantity: 1,
      unitPrice: 0,
      amount: 0,
    };
    setItems([...items, newItem]);
  };

  const updateItem = (
    id: string,
    field: keyof QuotationItem,
    value: string | number
  ) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };
          if (field === "quantity" || field === "unitPrice") {
            updatedItem.amount = updatedItem.quantity * updatedItem.unitPrice;
          }
          return updatedItem;
        }
        return item;
      })
    );
  };

  const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
  const taxRate = 0.1;
  const tax = Math.floor(subtotal * taxRate);
  const total = subtotal + tax;

  return (
    <Card className="max-w-4xl mx-auto p-6 bg-white">
      {/* Header */}
      <div className="flex justify-end">
        <div className="flex flex-col items-end text-right space-y-1">
          <div className="flex items-center gap-2">
            <Label htmlFor="quotation-date">見積日付:</Label>
            <Input
              id="quotation-date"
              type="date"
              value={quotationDate}
              onChange={(e) => setQuotationDate(e.target.value)}
              className="w-40"
            />
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="quotation-number">見積書番号:</Label>
            <Input
              id="quotation-number"
              value={quotationNumber}
              onChange={(e) => setQuotationNumber(e.target.value)}
              className="w-40"
              placeholder="番号を入力"
            />
          </div>
        </div>
      </div>

      <CardHeader className="bg-neutral-400 mb-5 h-15 flex items-center justify-center">
        <h2 className="text-2xl font-semibold text-center text-white tracking-widest">
          御見積書
        </h2>
      </CardHeader>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Client Information */}
        <Card className="py-1">
          <CardContent className="p-4 space-y-4">
            <div className="flex border-b-2 border-black pb-1">
              <Input
                id="client-name"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="会社名を入力"
                className="mt-1 mr-2"
              />
              <Label className="flex items-end text-base" htmlFor="client-name">
                様
              </Label>
            </div>
          </CardContent>
        </Card>

        {/* Company Information */}
        <Card className="py-1">
          <CardContent className="p-4 space-y-4">
            {/* 会社名 */}
            <div className="mb-2">
              <Input
                id="company-name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="会社名"
              />
            </div>

            {/* 郵便番号 */}
            <div className="flex items-center gap-1 mb-2">
              <Label htmlFor="postal-code">〒</Label>
              <Input
                id="postal-code"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                placeholder="100-0001"
                className="w-full"
              />
            </div>

            {/* 住所 */}
            <div className="mb-2">
              <Textarea
                id="company-address"
                value={companyAddress}
                onChange={(e) => setCompanyAddress(e.target.value)}
                rows={3}
                placeholder="住所"
              />
            </div>

            {/* 電話番号 */}
            <div className="flex items-center gap-1 mb-2">
              <Label htmlFor="company-phone">TEL</Label>
              <Input
                id="company-phone"
                value={companyPhone}
                onChange={(e) => setCompanyPhone(e.target.value)}
                placeholder="03-1234-5678"
                className="w-full"
              />
            </div>

            {/* 担当者 */}
            <div className="flex items-center gap-1 mb-2">
              <Label htmlFor="company-manager" className="w-14">
                担当者
              </Label>
              <Input
                id="company-manager"
                value={companyManager}
                onChange={(e) => setCompanyManager(e.target.value)}
                placeholder="山田 太郎"
                className="w-full"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="py-0">
          <CardContent className="p-4 space-y-4">
            <div className="text-sm text-gray-600 space-y-1">
              <p>下記の通りお見積もりいたします。</p>
              <p>以下の通りお見積申し上げます。</p>
              <p>ご検討の程、よろしくお願いいたします。</p>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-1">
          <Card className="flex-1 max-w-sm py-0">
            <CardContent className="p-4 space-y-4">{/* 内容 */}</CardContent>
          </Card>

          <Card className="flex-1 max-w-sm py-0">
            <CardContent className="p-4 space-y-4">{/* 内容 */}</CardContent>
          </Card>

          <Card className="flex-1 max-w-sm py-0">
            <CardContent className="p-4 space-y-4">{/* 内容 */}</CardContent>
          </Card>
        </div>
      </div>

      {/* Quotation Amount Header */}
      <div className="mb-6 flex justify-center">
        <div className="w-1/2">
          <div className="flex text-center py-2 border-b-2 border-black justify-between">
            <div className="text-xl ml-5">御見積金額</div>
            <div className="text-xl mx-10">単価見積</div>
          </div>
          <div className="flex items-center justify-center gap-2 py-2 mx-20">
            <div className="text-sm font-medium">(内消費税</div>
            <Input
              id="tax-cost"
              value={taxCost}
              onChange={(e) => setTaxCost(e.target.value)}
              placeholder="金額を入力"
              className="w-40 h-9"
            />
            <div className="text-sm text-gray-600">円)</div>
          </div>
        </div>
      </div>

      {/* Quotation Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
        {/* Left Column */}
        <Card className="py-1">
          <CardContent className="p-4 space-y-4">
            <div className="flex">
              <Label
                htmlFor="product-name"
                className="text-sm font-medium w-28 h-10 flex items-center justify-center bg-neutral-400 text-white px-2 rounded"
              >
                品名
              </Label>
              <Input
                id="product-name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="flex-1 h-10 ml-2"
                placeholder="品名を入力"
              />
            </div>
            <div className="flex">
              <Label
                htmlFor="loading-location"
                className="text-sm font-medium w-28 h-10 flex items-center justify-center bg-neutral-400 text-white px-2 rounded"
              >
                積地
              </Label>
              <Input
                id="loading-location"
                value={loadingLocation}
                onChange={(e) => setLoadingLocation(e.target.value)}
                className="flex-1 h-10 ml-2"
                placeholder="積地を入力"
              />
            </div>
            <div className="flex">
              <Label
                htmlFor="payment-terms"
                className="text-sm font-medium w-28 h-10 flex items-center justify-center bg-neutral-400 text-white px-2 rounded"
              >
                支払条件
              </Label>
              <Input
                id="payment-terms"
                value={paymentTerms}
                onChange={(e) => setPaymentTerms(e.target.value)}
                className="flex-1 h-10 ml-2"
                placeholder="支払条件を入力"
              />
            </div>
          </CardContent>
        </Card>

        {/* Right Column */}
        <Card className="py-1">
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center gap-2">
              <Label
                htmlFor="transport-content"
                className="text-sm font-medium w-28 h-10 flex items-center justify-center bg-neutral-400 text-white px-2 rounded"
              >
                輸送内容
              </Label>
              <Input
                id="transport-content"
                value={transportContent}
                onChange={(e) => setTransportContent(e.target.value)}
                className="flex-1 h-10"
                placeholder="輸送内容を入力"
              />
            </div>

            <div className="flex items-center gap-2">
              <Label
                htmlFor="unloading-location"
                className="text-sm font-medium w-28 h-10 flex items-center justify-center bg-neutral-400 text-white px-2 rounded"
              >
                卸地
              </Label>
              <Input
                id="unloading-location"
                value={unloadingLocation}
                onChange={(e) => setUnloadingLocation(e.target.value)}
                className="flex-1 h-10"
                placeholder="卸地を入力"
              />
            </div>

            <div className="flex items-center gap-2">
              <Label
                htmlFor="quote-validity"
                className="text-sm font-medium w-28 h-10 flex items-center justify-center bg-neutral-400 text-white px-2 rounded"
              >
                見積有効期限
              </Label>
              <Input
                id="quote-validity"
                value={quoteValidity}
                onChange={(e) => setQuoteValidity(e.target.value)}
                className="flex-1 h-10"
                placeholder="有効期限を入力"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Items Table */}
      <Card className=" py-1 pb-6 mb-6">
        <CardContent className="mt-6">
          <Table>
            <TableHeader>
              <TableRow className="bg-neutral-400 hover:bg-neutral-400">
                <TableHead className="w-[25%] text-center border text-white">
                  摘要
                </TableHead>
                <TableHead className="w-[10%] text-center border text-white">
                  距離
                </TableHead>
                <TableHead className="w-[15%] text-center border text-white">
                  単価
                </TableHead>
                <TableHead className="w-[15%] text-center border text-white">
                  数量
                </TableHead>
                <TableHead className="w-[10%] text-center border text-white">
                  単位
                </TableHead>
                <TableHead className="w-[15%] text-center border text-white">
                  金額
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell className="border">
                    <Textarea
                      value={item.description}
                      onChange={(e) =>
                        updateItem(item.id, "description", e.target.value)
                      }
                      placeholder=""
                      className="min-h-[40px] resize-none border-none"
                    />
                  </TableCell>
                  <TableCell className="border">
                    <Input
                      className="text-center border-none"
                      placeholder=""
                      value={item.distance || ""}
                      onChange={(e) =>
                        updateItem(item.id, "distance", e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell className="border">
                    <Input
                      type="number"
                      value={item.unitPrice || ""}
                      onChange={(e) =>
                        updateItem(
                          item.id,
                          "unitPrice",
                          Number.parseFloat(e.target.value) || 0
                        )
                      }
                      className="text-right border-none"
                      min="0"
                      step="1"
                      placeholder=""
                    />
                  </TableCell>
                  <TableCell className="border">
                    <Input
                      type="number"
                      value={item.quantity || ""}
                      onChange={(e) =>
                        updateItem(
                          item.id,
                          "quantity",
                          Number.parseFloat(e.target.value) || 0
                        )
                      }
                      className="text-center border-none"
                      min="0"
                      step="0.1"
                    />
                  </TableCell>
                  <TableCell className="border">
                    <div className="text-center">
                      {index === 0 ? "台" : index === 4 ? "ℓ" : ""}
                    </div>
                  </TableCell>
                  <TableCell className="border text-right font-medium">
                    {item.amount > 0 ? item.amount.toLocaleString() : ""}
                  </TableCell>
                </TableRow>
              ))}

              {/* Empty rows for spacing */}
              {Array.from({ length: Math.max(0, 1) }).map((_, index) => (
                <TableRow key={`empty-${index}`}>
                  <TableCell className="border h-12"></TableCell>
                  <TableCell className="border"></TableCell>
                  <TableCell className="border"></TableCell>
                  <TableCell className="border"></TableCell>
                  <TableCell className="border"></TableCell>
                  <TableCell className="border"></TableCell>
                </TableRow>
              ))}

              {/* Total rows */}
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="border text-center font-medium bg-gray-50"
                >
                  小　計
                </TableCell>
                <TableCell className="border text-right font-medium bg-gray-50">
                  {subtotal.toLocaleString()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="border text-center font-medium bg-gray-50"
                >
                  消費税
                </TableCell>
                <TableCell className="border text-right font-medium bg-gray-50"></TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="border text-center font-bold bg-gray-50"
                >
                  合　計
                </TableCell>
                <TableCell className="border text-right font-bold bg-gray-50 text-lg">
                  {total.toLocaleString()}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Terms and Conditions */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">備考・条件</h3>
        </CardHeader>
        <CardContent className="text-sm space-y-2">
          <p>① 記載価格は○○○機器一式○○○機器一式○○○機器までとなります。</p>
          <p>
            ② 記載価格は税込み価格で表示しております。（消費税込み価格表示）
          </p>
          <p>
            ③
            記載価格は現場での設置工事費は含まれておりません。設置工事費は別途お見積もりいたします。
          </p>
          <p>
            ④
            機器により工事日数の異なる場合があります。詳細は見積日よりご相談させていただきます。
          </p>
          <p>
            ⑤
            ユーザ様での機器の設置について、工事について、詳細についてご不明な点がございましたら、お気軽にお問い合わせください。
          </p>
          <p>
            ⑥
            ユーザ様での機器の設置について、工事について、詳細についてご不明な点がございましたら、お気軽にお問い合わせください。
          </p>
          <p>⑦ 本見積の有効期限について○○日間とお見積もりいたします。</p>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 mt-8">
        <Button variant="outline" className="hover:cursor-pointer">
          プレビュー
        </Button>
        <Button variant="outline" className="hover:cursor-pointer">
          PDF出力
        </Button>
        <Button className="hover:cursor-pointer">見積書を保存</Button>
      </div>
    </Card>
  );
}
