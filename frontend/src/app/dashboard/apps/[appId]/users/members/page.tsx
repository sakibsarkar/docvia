"use client";

import { SearchBar } from "@/components";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Check, Trash, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const MOCK_MEMBERS = [
  {
    id: "1",
    name: "Rifajul",
    email: "rifajul@example.com",
    location: "Bangladesh",
    role: "Admin" as const,
    active: true,
  },
  {
    id: "2",
    name: "Alex Mercer",
    email: "alex@example.com",
    location: "USA",
    role: "Agent" as const,
    active: true,
  },
  {
    id: "3",
    name: "Sofia Khan",
    email: "sofia@example.com",
    location: "UK",
    role: "Agent" as const,
    active: false,
  },
];

type InviteRow = { id: string; email: string; role: "Admin" | "Agent" };

const initials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const Avatar = ({ name }: { name: string }) => (
  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-400 text-[12px] font-medium text-white">
    {initials(name)}
  </div>
);

function MemberSlideOver({
  open,
  onClose,
  member,
  onSave,
  onDelete,
}: {
  open: boolean;
  onClose: () => void;
  member: (typeof MOCK_MEMBERS)[number] | null;
  onSave: (m: (typeof MOCK_MEMBERS)[number]) => void;
  onDelete: (id: string) => void;
}) {
  const [role, setRole] = useState<"Admin" | "Agent">(member?.role ?? "Agent");
  const [active, setActive] = useState<boolean>(member?.active ?? true);

  useEffect(() => {
    if (member) {
      setRole(member.role as "Admin" | "Agent");
      setActive(member.active);
    }
  }, [member]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-screen max-w-md">
        <div className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center gap-3">
            <Avatar name={member?.name ?? ""} />
            <div>
              <DialogTitle className="text-base font-semibold text-gray-900">
                {member?.name}
              </DialogTitle>
              <p className="text-xs text-gray-500">
                Last Known Location:{" "}
                <span className="inline-flex items-center gap-1">
                  <span className="h-2.5 w-2.5 rounded-sm bg-green-500" />
                  {member?.location}
                </span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-6 py-5">
          <div>
            <p className="mb-3 text-sm font-medium text-gray-700">Role</p>
            <RadioGroup
              value={role}
              onValueChange={(role) => setRole(role as "Admin" | "Agent")}
              className="flex gap-6"
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem value="Admin" id="role-admin" />
                <label
                  htmlFor="role-admin"
                  className="flex cursor-pointer items-center gap-2 rounded-md border border-gray-200 px-3 py-1.5 text-sm text-gray-700 has-[:checked]:border-emerald-500 has-[:checked]:text-emerald-600"
                >
                  Admin
                </label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="Agent" id="role-agent" />
                <label
                  htmlFor="role-agent"
                  className="flex cursor-pointer items-center gap-2 rounded-md border border-gray-200 px-3 py-1.5 text-sm text-gray-700 has-[:checked]:border-emerald-500 has-[:checked]:text-emerald-600"
                >
                  Agent
                </label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Agent Status</span>
            <Switch checked={active} onCheckedChange={setActive} />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t pt-4">
          <button
            onClick={() => member && onDelete(member.id)}
            className="rounded-md bg-rose-500 px-4 py-2 text-sm font-medium text-white hover:bg-rose-600"
          >
            Delete
          </button>
          <button
            onClick={() => member && onSave({ ...member, role, active })}
            className="rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

const TableHeader = ({
  allSelected,
  onToggleAll,
}: {
  allSelected: boolean;
  onToggleAll: () => void;
}) => (
  <thead className="bg-gray-50 text-left text-xs font-medium text-gray-500">
    <tr>
      <th className="w-12 px-4 py-3">
        <input
          type="checkbox"
          checked={allSelected}
          onChange={onToggleAll}
          className="h-5 w-5 rounded border-gray-200 focus:ring-0"
        />
      </th>
      <th className="px-4 py-3">Agent</th>
      <th className="px-4 py-3">Admin</th>
      <th className="px-4 py-3">Agent Status</th>
    </tr>
  </thead>
);

export default function Members() {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [search, setSearch] = useState("");

  const [rows, setRows] = useState(MOCK_MEMBERS);
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [hoverId, setHoverId] = useState<string | null>(null);

  const [openSlide, setOpenSlide] = useState(false);
  const [activeMember, setActiveMember] = useState<(typeof MOCK_MEMBERS)[number] | null>(null);

  const [inviteRows, setInviteRows] = useState<InviteRow[]>([
    { id: crypto.randomUUID(), email: "", role: "Admin" },
  ]);

  const filtered = useMemo(() => {
    if (!search) return rows;
    const q = search.toLowerCase();
    return rows.filter(
      (r) => r.name.toLowerCase().includes(q) || r.email.toLowerCase().includes(q)
    );
  }, [rows, search]);

  const allSelected = filtered.length > 0 && filtered.every((r) => selected[r.id]);
  const selectedCount = filtered.filter((r) => selected[r.id]).length;
  const anySelected = selectedCount > 0;

  const toggleAll = () => {
    const next = { ...selected } as Record<string, boolean>;
    const value = !allSelected;
    filtered.forEach((r) => (next[r.id] = value));
    setSelected(next);
  };

  const clearSelection = () => {
    setSelected({});
  };

  const bulkDelete = () => {
    const idsToDelete = new Set(Object.keys(selected).filter((k) => selected[k]));
    if (idsToDelete.size === 0) return;
    setRows((prev) => prev.filter((r) => !idsToDelete.has(r.id)));
    setSelected({});
  };

  const onRowClick = (member: (typeof MOCK_MEMBERS)[number]) => {
    setActiveMember(member);
    setOpenSlide(true);
  };

  const saveMember = (updated: (typeof MOCK_MEMBERS)[number]) => {
    setRows((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
    setOpenSlide(false);
  };

  const deleteMember = (id: string) => {
    setRows((prev) => prev.filter((r) => r.id !== id));
    setOpenSlide(false);
    setSelected((s) => {
      const { [id]: _, ...rest } = s;
      return rest;
    });
  };

  const addInviteRow = () =>
    setInviteRows((rows) => [...rows, { id: crypto.randomUUID(), email: "", role: "Admin" }]);

  const updateInviteRow = (id: string, patch: Partial<InviteRow>) =>
    setInviteRows((rows) => rows.map((r) => (r.id === id ? { ...r, ...patch } : r)));

  const deleteInviteRow = (id: string) =>
    setInviteRows((rows) => (rows.length > 1 ? rows.filter((r) => r.id !== id) : rows));

  const canDelete = inviteRows.length > 1;

  return (
    <section>
      <MemberSlideOver
        open={openSlide}
        onClose={() => setOpenSlide(false)}
        member={activeMember}
        onSave={saveMember}
        onDelete={deleteMember}
      />

      {showInviteModal ? (
        <div className="rounded-md border border-gray-200 bg-white p-4">
          <h3 className="mb-4 text-sm font-normal text-gray-500">
            Invite agents by entering their email address
          </h3>

          <div className="">
            <div className="mb-3 grid grid-cols-12 items-center gap-6 bg-gray-50 px-2 py-3 text-xs font-medium text-gray-500">
              <div className="col-span-6">Email</div>
              <div className="col-span-5">Role</div>
              <div className="col-span-1" />
            </div>

            {inviteRows.map((row, idx) => (
              <div key={row.id} className="grid grid-cols-12 items-center gap-6 rounded-md p-3">
                <div className="col-span-6">
                  <input
                    type="email"
                    value={row.email}
                    onChange={(e) => updateInviteRow(row.id, { email: e.target.value })}
                    className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="col-span-5">
                  <div className="flex items-center gap-6">
                    <label className="inline-flex cursor-pointer items-center gap-2 text-sm">
                      <input
                        type="radio"
                        name={`role-${row.id}`}
                        className="h-4 w-4 text-emerald-600 focus:ring-emerald-500"
                        checked={row.role === "Admin"}
                        onChange={() => updateInviteRow(row.id, { role: "Admin" })}
                      />
                      Admin
                    </label>
                    <label className="inline-flex cursor-pointer items-center gap-2 text-sm">
                      <input
                        type="radio"
                        name={`role-${row.id}`}
                        className="h-4 w-4 text-emerald-600 focus:ring-emerald-500"
                        checked={row.role === "Agent"}
                        onChange={() => updateInviteRow(row.id, { role: "Agent" })}
                      />
                      Agent
                    </label>
                  </div>
                </div>

                <div className="col-span-1 flex justify-end">
                  {canDelete && (
                    <button
                      type="button"
                      onClick={() => deleteInviteRow(row.id)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-600 hover:bg-gray-200"
                      title="Remove"
                      aria-label={`Remove row ${idx + 1}`}
                    >
                      <Trash className="h-5 w-5" />
                    </button>
                  )}
                </div>
              </div>
            ))}

            <div className="flex justify-end">
              <button
                type="button"
                onClick={addInviteRow}
                className="inline-flex items-center gap-2 rounded-md border border-emerald-500 px-3 py-1.5 text-sm font-medium text-emerald-600 hover:bg-emerald-50"
              >
                <span className="text-base leading-none">＋</span> Add Another
              </button>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <button
              onClick={() => {
                setShowInviteModal(false);
              }}
              type="button"
              className="inline-flex w-full items-center justify-center rounded-md border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 disabled:opacity-60"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={() => {
                setShowInviteModal(false);
              }}
              className="inline-flex w-full items-center justify-center rounded-md bg-blue-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-600 disabled:opacity-60"
              disabled={inviteRows.some((r) => !r.email)}
            >
              Send Invitation
            </button>
          </div>
        </div>
      ) : (
        <div className="mb-6 rounded-md border border-gray-200 bg-white">
          <div className="flex flex-col gap-3 border-b border-gray-200 p-4 pb-4 md:flex-row md:items-center md:justify-between">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search"
              widthClassName="w-[340px]"
            />

            {anySelected ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-700">
                  {selectedCount} item{selectedCount > 1 ? "s" : ""} selected
                </span>

                <span className="h-5 w-px bg-gray-300" aria-hidden="true" />

                <button
                  onClick={bulkDelete}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-600 hover:bg-gray-100"
                  title="Delete selected"
                  aria-label="Delete selected"
                >
                  <Trash className="h-5 w-5" />
                </button>

                <button
                  onClick={clearSelection}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-600 hover:bg-gray-100"
                  title="Clear selection"
                  aria-label="Clear selection"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <button
                className="flex items-center gap-1 rounded bg-blue-500 px-4 py-2 font-poppins text-[14px] font-normal text-white hover:bg-blue-600"
                onClick={() => setShowInviteModal(true)}
              >
                Invite Member
              </button>
            )}
          </div>

          <div className="overflow-hidden rounded-md">
            <table className="min-w-full divide-y divide-gray-200">
              <TableHeader allSelected={allSelected} onToggleAll={toggleAll} />
              <tbody className="divide-y divide-gray-100 bg-white text-sm">
                {filtered.map((m) => {
                  const isSelected = !!selected[m.id];
                  const showCheckbox = isSelected || hoverId === m.id;

                  return (
                    <tr
                      key={m.id}
                      className="group cursor-pointer hover:bg-gray-50"
                      onClick={() => onRowClick(m)}
                      onMouseEnter={() => setHoverId(m.id)}
                      onMouseLeave={() => setHoverId((id) => (id === m.id ? null : id))}
                    >
                      <td className="w-12 px-4 py-3 align-middle">
                        <div className="relative">
                          <div className={showCheckbox ? "hidden" : "block"}>
                            <Avatar name={m.name} />
                          </div>

                          <input
                            type="checkbox"
                            className={`${
                              showCheckbox ? "block" : "hidden"
                            } h-5 w-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500`}
                            checked={isSelected}
                            onChange={(e) => {
                              e.stopPropagation();
                              setSelected((s) => ({
                                ...s,
                                [m.id]: e.target.checked,
                              }));
                            }}
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div>
                            <p className="font-medium text-gray-900">{m.name}</p>
                            <p className="text-xs text-gray-500">{m.email}</p>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-3">
                        {m.role === "Admin" ? (
                          <span
                            title="Admin"
                            className="inline-flex h-5 w-5 items-center justify-center text-sm"
                          >
                            <Check className="h-4 w-4" />
                          </span>
                        ) : (
                          <span className="text-xs text-gray-400">—</span>
                        )}
                      </td>

                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex h-2 w-2 rounded-full ${m.active ? "bg-green-500" : "bg-gray-300"}`}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}
