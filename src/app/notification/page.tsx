import { PageHeader } from "@/components/page-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NotificationHistory from "@/app/notification/_components/notification-history";
import NotificationSend from "@/app/notification/_components/notification-send";
import { fetchNotificationHistory } from "@/app/notification/_action/data";

export default async function Notification() {
  const notificationHistory = await fetchNotificationHistory();

  return (
    <div>
      <PageHeader
        title="푸시 알림"
        description="푸시 알림 발송과 발송 내역을 확인할 수 있습니다."
      />
      <Tabs defaultValue="send">
        <TabsList>
          <TabsTrigger value="send">발송</TabsTrigger>
          <TabsTrigger value="history">발송 내역</TabsTrigger>
        </TabsList>
        <TabsContent value="send" className="max-w-xl">
          <NotificationSend />
        </TabsContent>
        <TabsContent value="history" className="max-w-4xl">
          <NotificationHistory notificationHistory={notificationHistory.data} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
