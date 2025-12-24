// Layout Edit Page
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import GridLayout, { Layout } from "react-grid-layout";
import ManageLayoutWrapper from "@/components/layouts/ManageLayout";
import { Container, Toolbar, ToolbarActions, ToolbarHeading } from "@/components/common/toolbar";
import { useDetailLayout } from "@/services/api/layout/get/get.hooks";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { X } from "lucide-react";
import { axiosClient } from "@/lib/axios";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const UpdateLayoutFunction = async ({ id, data }: { id: string; data: any }) => {
  const response = await axiosClient.put(`/electron/layout/${id}`, data);
  return response.data;
};

interface LayoutItem {
  path_slug: string;
  name: string;
}

export default function LayoutEditPage() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, refetch } = useDetailLayout({ id: id || "" });

  const updateLayout = useMutation({ mutationFn: UpdateLayoutFunction });

  const [layout, setLayout] = useState<Layout[]>([]);
  const [availableItems, setAvailableItems] = useState<LayoutItem[]>([]);

  const onDragStart = (e: React.DragEvent, item: LayoutItem) => {
    e.dataTransfer.setData("text/plain", JSON.stringify({ id: item.path_slug, name: item.name, type: "source-item" }));
  };

  const addItemToLayout = (item: LayoutItem) => {
    if (!layout) return;
    const existingItem = layout.find(l => l.i === item.path_slug);
    if (existingItem) { toast.warning("Item sudah ada di layout!"); return; }

    const newLayoutItem: Layout = { i: item.path_slug, x: (layout.length * 3) % 12, y: Math.floor((layout.length * 3) / 12) * 2, w: 3, h: 2 };
    setLayout([...layout, newLayoutItem]);
    setAvailableItems(availableItems.filter(ai => ai.path_slug !== item.path_slug));
  };

  const removeItemFromLayout = (itemId: string) => {
    if (!layout || !data?.data?.data) return;
    const removedItem = data.data.data.find((item: LayoutItem) => item.path_slug === itemId);
    if (removedItem) { setAvailableItems([...availableItems, removedItem]); }
    setLayout(layout.filter(l => l.i !== itemId));
  };

  useEffect(() => {
    if (!isLoading && data) {
      const rawLayout = data?.data?.layout?.layout;
      const layoutArray = Array.isArray(rawLayout) ? (rawLayout as Layout[]) : [];
      const allData = data?.data?.data || [];
      const layoutItems = layoutArray.filter((layoutItem: Layout) => allData.some((item: LayoutItem) => item.path_slug === layoutItem.i));
      setLayout(layoutItems);
      const itemsNotInLayout = allData.filter((item: LayoutItem) => !layoutArray.some((layoutItem: Layout) => layoutItem.i === item.path_slug));
      setAvailableItems(itemsNotInLayout);
    }
  }, [isLoading, data]);

  const onSave = () => {
    if (!id) return;
    updateLayout.mutate({ id, data: { layout: layout } }, {
      onSuccess() { toast.success("Berhasil diupdate!"); },
      onError(error: any) { toast.error(error?.response?.data?.message ?? "Telah terjadi kesalahan!"); }
    });
  };

  const onSetDefault = () => {
    if (!data?.data?.data || !id) return;
    const defaultLayout: Layout[] = data.data.data.filter((item: LayoutItem) => typeof item.path_slug === "string")
      .map((item: LayoutItem, index: number) => ({ i: item.path_slug as string, x: (index * 3) % 12, y: Math.floor((index * 3) / 12) * 2, w: 3, h: 2 }));

    updateLayout.mutate({ id, data: { layout: defaultLayout } }, {
      onSuccess() { toast.success("Berhasil diset default!"); refetch(); },
      onError(error: any) { toast.error(error?.response?.data?.message ?? "Telah terjadi kesalahan!"); }
    });
  };

  return (
    <ManageLayoutWrapper>
      <Toolbar>
        <ToolbarHeading title="Edit Layout" />
        <ToolbarActions><Link to="/manage/layout" className="btn">Back to Layouts</Link></ToolbarActions>
      </Toolbar>
      <Container>
        {isLoading ? (
          <div className="flex justify-center py-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>
        ) : (
          <div className="space-y-6">
            <div className="bg-card rounded-lg border border-border p-4">
              <h6 className="text-base font-semibold text-foreground mb-3">Items Tersedia (Drag ke Layout)</h6>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {availableItems.map((item) => (
                  <div key={item.path_slug} draggable={true} onDragStart={(e) => onDragStart(e, item)} className="p-3 rounded border text-center cursor-move transition-all bg-primary/10 hover:bg-primary/20 border-primary/30 text-foreground text-sm" title="Drag ke layout di bawah">
                    <div className="font-medium truncate">{item.name}</div>
                  </div>
                ))}
              </div>
              {availableItems.length === 0 && <p className="text-muted-foreground text-center py-4 text-sm">Tidak ada items tersedia</p>}
            </div>

            <div className="bg-card rounded-lg border border-border p-4">
              <h6 className="text-base font-semibold text-foreground mb-3">Layout Area</h6>
              {layout?.length ? (
                <div onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); try { const item = JSON.parse(e.dataTransfer.getData("text/plain")); if (item.type === "source-item") { const fullItem = availableItems.find(ai => ai.path_slug === item.id); if (fullItem) addItemToLayout(fullItem); } } catch (error) { console.error("Error:", error); } }}>
                  <GridLayout className="layout border border-dashed border-border bg-muted/50 min-h-[400px]" layout={layout} cols={12} rowHeight={30} width={900} onLayoutChange={setLayout} isDraggable={true} isResizable={true}>
                    {layout.map((l) => { const item = data?.data?.data?.find((d: LayoutItem) => d.path_slug === l.i); return item ? (
                      <div key={l.i} className="bg-card border-2 border-border p-2 rounded shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                          <span className="text-sm font-medium text-foreground truncate">{item.name}</span>
                          <button onClick={() => removeItemFromLayout(l.i)} className="text-red-500 hover:text-red-400 ml-1" title="Hapus"><X className="w-4 h-4" /></button>
                        </div>
                      </div>
                    ) : null; })}
                  </GridLayout>
                </div>
              ) : (
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center bg-muted/50 min-h-[400px] flex items-center justify-center" onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); try { const item = JSON.parse(e.dataTransfer.getData("text/plain")); if (item.type === "source-item") { const fullItem = availableItems.find(ai => ai.path_slug === item.id); if (fullItem) addItemToLayout(fullItem); } } catch (error) { console.error("Error:", error); } }}>
                  <div className="text-muted-foreground"><p className="text-lg mb-2">Layout kosong</p><p className="text-sm">Drag items dari atas ke sini</p></div>
                </div>
              )}
            </div>

            <div className="flex gap-3 justify-end">
              <button className="btn btn-secondary" onClick={onSetDefault} disabled={updateLayout.isPending}>Set Default</button>
              <button className="btn" onClick={onSave} disabled={updateLayout.isPending}>{updateLayout.isPending ? 'Saving...' : 'Simpan Layout'}</button>
            </div>
          </div>
        )}
      </Container>
    </ManageLayoutWrapper>
  );
}
